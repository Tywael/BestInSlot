from flask import Flask
from flask_cors import CORS
from peewee import SqliteDatabase
from .models import initialize

db = SqliteDatabase('bisData.db')

def create_app():
    initialize()
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "chrome-extension://hkfdefopkehdfaddclhfpnbiflnibfhe"}})

    # Import and register the blueprint
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app