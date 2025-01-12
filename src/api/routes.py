"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import app
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import re
import bcrypt

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
    
@api.route('/register', methods=['POST'])
def register_user():
    
    body = request.get_json()
    user_nombre = body.get('nombre', None)
    user_email = body.get('email', None)
    user_contraseña = body.get('contraseña', None)
    if user_nombre is None or user_email is None or user_contraseña is None:
        return {'message': 'Missing arguments'}      
    bpassword = bytes(user_contraseña, 'utf-8')
    salt = bcrypt.gensalt(14)
    hashed_password = bcrypt.hashpw(password=bpassword, salt=salt)       
    user = User(user_nombre, user_email, hashed_password.decode('utf-8'))    
    #return {'message': f'nombre: {user.nombre} email: {user.email} contraseña: {contraseña}'}
    db.session.add(user)
    db.session.commit()
    return {'message': f'User {user.email} was created'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
