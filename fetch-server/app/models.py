from peewee import Model, CharField, TextField, ForeignKeyField, SqliteDatabase, AutoField, DateTimeField
from datetime import datetime
import json

db = SqliteDatabase('bisData.db', pragmas={'journal_mode': 'wal', 'cache_size': -1024 * 64, 'foreign_keys': 1, 'ignore_check_constraints': 0, 'synchronous': 0, 'timeout': 10})

class BaseModel(Model):
    class Meta:
        database = db

class BisData(BaseModel):
    id = AutoField()
    class_name = CharField(unique=True)
    modified_date = DateTimeField(default=datetime.now)

class Subclass(BaseModel):
    id = AutoField()
    bis_data = ForeignKeyField(BisData, backref='subclasses')
    subclass_name = CharField(unique=True)
    retrieved_date = DateTimeField()
    modified_date = DateTimeField(default=datetime.now)

class Build(BaseModel):
    id = AutoField()
    subclass = ForeignKeyField(Subclass, backref='builds')
    build_name = CharField(unique=True)
    modified_date = DateTimeField(default=datetime.now)

class Item(BaseModel):
    id = AutoField()
    build = ForeignKeyField(Build, backref='items')
    item_id = CharField()
    item_text = TextField() 
    modified_date = DateTimeField(default=datetime.now)

def initialize():
    db.connect()
    db.create_tables([BisData, Subclass, Build, Item], safe=True)
    db.close()

def fetch_data(json_data):
    try:
        db.connect()
        with db.atomic():
            bis_data_list = json_data.get('bisData', [])
            if not isinstance(bis_data_list, list):
                raise TypeError("Expected 'bisData' to be a list")

            for class_data in bis_data_list:
                if not isinstance(class_data, dict):
                    raise TypeError("Expected class_data to be a dictionary")

                class_name = class_data.get("class")
                subclasses = class_data.get("subclasses", [])
                if not class_name or not subclasses:
                    raise ValueError("class_name and subclasses are required")

                bis_data, created = BisData.get_or_create(
                    class_name=class_name,
                    defaults={'subclasses': json.dumps(subclasses), 'modified_date': datetime.now()}
                )
                if not created:
                    bis_data.modified_date = datetime.now()
                    bis_data.save()

                for subclass_data in subclasses:
                    retrieved_date = datetime.strptime(subclass_data["retrieved_date"], '%Y-%m-%dT%H:%M:%S.%fZ')
                    subclass, created = Subclass.get_or_create(
                        bis_data=bis_data,
                        subclass_name=subclass_data["subclass"],
                        defaults={'builds': json.dumps(subclass_data["builds"]), 'retrieved_date': retrieved_date}
                    )
                    if not created:
                        subclass.builds = json.dumps(subclass_data["builds"])
                        subclass.retrieved_date = retrieved_date
                        subclass.save()

                    for build_data in subclass_data["builds"]:
                        build, created = Build.get_or_create(
                            subclass=subclass,
                            build_name=build_data["build"],
                            defaults={'modified_date': datetime.now()}
                        )
                        if not created:
                            build.modified_date = datetime.now()
                            build.save()

                        for item_data in build_data["items"]:
                            item, created = Item.get_or_create(
                                build=build,
                                item_id=item_data["id"],
                                defaults={'item_text': item_data["text"]}
                            )
                            if not created:
                                item.item_text = item_data["text"]
                                item.save()
    finally:
        db.close()