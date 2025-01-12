"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import app
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/news', methods=['GET'])
def get_news():
    url = "https://newsapi.org/v2/everything?q=sostenibilidad+medioambiental&apiKey=66922d250edf41b0be44aae6d0911a11&language=es"
    response = requests.request("GET", url)
    if response.status_code == 200:
        news_data = response.json()
        articles = news_data["articles"]
        articles_list = [article for article in articles if article]
        return jsonify(articles_list)
    else:
        return jsonify({"error": "Error fetching news"}), response.status_code

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
