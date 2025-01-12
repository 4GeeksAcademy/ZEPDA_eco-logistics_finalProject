"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import app
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Company
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import re
import bcrypt

def check(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)):
        return True
    else:
        return False
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

@api.route('/registerCompany', methods=['POST'])
def register_company():
    
    body = request.get_json()
    company_nif = body.get('nif', None)
    company_nombre = body.get('nombre', None)
    company_sector = body.get('sector', None)
    company_direccion = body.get('direccion', None)
    company_email = body.get('email', None)
    company_descripcion = body.get('descripcion', None)
    company_web= body.get('web', None)
    company_contraseña = body.get('contraseña', None)
    company_certificado = body.get('certificado', None)
    if company_nombre is None or company_email is None or company_contraseña is None:
        return {'message': 'Missing arguments'}      
    bpassword = bytes(company_contraseña, 'utf-8')
    salt = bcrypt.gensalt(14)
    hashed_password = bcrypt.hashpw(password=bpassword, salt=salt)       
    user = Company(company_nif, company_nombre, company_sector, company_direccion, company_email, company_descripcion, company_web, hashed_password.decode('utf-8'), company_certificado)    
    #return {'message': f'nombre: {user.nombre} email: {user.email} contraseña: {contraseña}'}
    db.session.add(user)
    db.session.commit()
    return {'message': f'User {user.email} was created'}

@api.route('/profile/companies', methods=['GET'])
def get_companies():
    """Obtiene todas las compañías"""
    companies = Company.query.all()
    companies_serialized = [company.serialize() for company in companies]
    return jsonify(companies_serialized), 200


@api.route('/profile/companies/<int:company_id>', methods=['GET'])
def get_company(company_id):
    """Obtiene una compañía por ID"""
    company = Company.query.get(company_id)
    if company is None:
        return jsonify({"message": "Company not found"}), 404
    return jsonify(company.serialize()), 200


@api.route('/profile/companies', methods=['POST'])
def create_company():
    """Crea una nueva compañía"""
    body = request.get_json()
    
    nif = body.get('nif', None)
    nombre = body.get('nombre', None)
    sector = body.get('sector', None)
    direccion = body.get('direccion', None)
    email = body.get('email', None)
    descripcion = body.get('descripcion', None)
    web = body.get('web', None)
    contraseña = body.get('contraseña', None)
    certificado = body.get('certificado', None)
    
    if not all([nif, nombre, sector, direccion, email, descripcion, web]):
        return jsonify({"message": "Missing required fields"}), 400

    # Verificar si ya existe una compañía con el mismo NIF o email
    if Company.query.filter((Company.nif == nif) | (Company.email == email)).first():
        return jsonify({"message": "Company with this NIF or email already exists"}), 400

    company = Company(
        nif=nif,
        nombre=nombre,
        sector=sector,
        direccion=direccion,
        email=email,
        descripcion=descripcion,
        web=web,
        contraseña=contraseña,
        certificado=certificado
    )
    
    db.session.add(company)
    db.session.commit()
    return jsonify(company.serialize()), 201


@api.route('/profile/companies/<int:company_id>', methods=['PUT'])
def update_company(company_id):
    """Actualiza los datos de una compañía existente"""
    body = request.get_json()
    company = Company.query.get(company_id)
    
    if company is None:
        return jsonify({"message": "Company not found"}), 404

    company.nif = body.get('nif', company.nif)
    company.nombre = body.get('nombre', company.nombre)
    company.sector = body.get('sector', company.sector)
    company.direccion = body.get('direccion', company.direccion)
    company.email = body.get('email', company.email)
    company.descripcion = body.get('descripcion', company.descripcion)
    company.web = body.get('web', company.web)
    company.contraseña = body.get('contraseña', company.contraseña)
    company.certificado = body.get('certificado', company.certificado)

    db.session.commit()
    return jsonify(company.serialize()), 200


@api.route('/profile/companies/<int:company_id>', methods=['DELETE'])
def delete_company(company_id):
    """Elimina una compañía por ID"""
    company = Company.query.get(company_id)
    if company is None:
        return jsonify({"message": "Company not found"}), 404

    db.session.delete(company)
    db.session.commit()
    return jsonify({"message": f"Company {company_id} deleted"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
