"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/news', methods=['GET'])
def handle_news():
    url = "https://newsapi.org/v2/everything?q=sostenibilidad+medioambiental&apiKey=66922d250edf41b0be44aae6d0911a11&language=es"
    payload=()
    headers=()

    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.json()
    articles = data.get('articles', [])

    articles_list = [article for article in articles if article]

    return jsonify(articles_list), 200
