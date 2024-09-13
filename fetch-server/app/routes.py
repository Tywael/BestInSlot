from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS, cross_origin
from .models import fetch_data, BisData, Subclass, Build, Item

main = Blueprint('main', __name__)

@main.route('/upload', methods=['POST', 'OPTIONS'])
@cross_origin(origins='chrome-extension://hkfdefopkehdfaddclhfpnbiflnibfhe')
def upload_data():
    if request.method == 'OPTIONS':
        response = main.make_default_options_response()
        headers = request.headers.get('Access-Control-Request-Headers', '')
        response.headers['Access-Control-Allow-Headers'] = headers
        return response

    data = request.json
    if not data:
        return jsonify({'error': 'Invalid data'}), 400

    try:
        fetch_data(data)
        return jsonify({'message': 'Data received and stored'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main.route('/data', methods=['GET'])
@cross_origin(origins='chrome-extension://hkfdefopkehdfaddclhfpnbiflnibfhe')
def get_data():
    class_name = request.args.get('class')
    subclass_name = request.args.get('subclass')

    if not class_name or not subclass_name:
        return jsonify({'error': 'Invalid parameters'}), 400

    try:
        bis_data = BisData.get_or_none(BisData.class_name == class_name)
        if not bis_data:
            return jsonify({'error': 'Class not found'}), 404

        subclass = Subclass.get_or_none((Subclass.bis_data == bis_data) & (Subclass.subclass_name == subclass_name))
        if not subclass:
            return jsonify({'error': 'Subclass not found'}), 404

        builds = []
        for build in subclass.builds:
            items = [{'id': item.item_id, 'text': item.item_text} for item in build.items]
            builds.append({'build': build.build_name, 'items': items})

        response_data = {
            'class': class_name,
            'subclass': subclass_name,
            'builds': builds
        }

        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500