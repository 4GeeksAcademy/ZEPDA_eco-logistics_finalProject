"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import app
from flask import Flask, Blueprint, request, jsonify, url_for
from api.models import db, User, Company, Image
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import re
import bcrypt
import json
from api.cloudinary_helpers import upload_image, delete_image
from api.image_helpers import assign_image_to_user, assign_image_to_company

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

def check(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)):
        return True
    else:
        return False    
    
# --- CLOUDINARY ---
@api.route('/upload', methods=['POST'])
def upload_file():
    print(f'request: {request}')
    file = request.files['file']
    user_id = request.form.get('user_id')  # Obtener el ID del usuario del formulario
    company_id = request.form.get('company_id')  # Obtener el ID de la empresa del formulario

    # Verificar que los datos están llegando correctamente
    print(f'file: {file}')
    print(f'user_id: {user_id}')
    print(f'company_id: {company_id}')

    if file and file.filename:
        print(f'Nombre del archivo: {file.filename}') 
        content_length = file.content_length or len(file.stream.read()) 
        print(f'Tamaño del archivo: {content_length} bytes') 
        file.stream.seek(0) # Volver al inicio del archivo después de leer el contenido
        # Subir el archivo a Cloudinary
        response = upload_image(file)
        
        # Verificar que se subió correctamente
        print(f'upload response: {response}')

        if user_id:
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'Usuario no encontrado'}), 404
            assign_image_to_user(user, response)
        elif company_id:
            company = Company.query.get(company_id)
            if not company:
                return jsonify({'error': 'Compañía no encontrada'}), 404
            assign_image_to_company(company, response)
        else:
            return jsonify({'error': 'No se proporcionó un ID válido'}), 400

        return jsonify(response)
    else:
        return jsonify({'error': 'Archivo vacío o no seleccionado'}), 400
    


@api.route('/images', methods=['GET'])
def get_all_images():
    images = Image.query.all()
    image_list = [{'public_id': image.public_id, 'url': image.url} for image in images]
    return jsonify(image_list)

@api.route('/image/<public_id>', methods=['GET'])
def get_image(public_id):
    image = Image.query.filter_by(public_id=public_id).first()
    if image:
        return jsonify({'url': image.url})
    else:
        return jsonify({'error': 'Imagen no encontrada'}), 404
    
@api.route('/delete/<public_id>', methods=['DELETE'])
def delete_image_endpoint(public_id):
    image = Image.query.filter_by(public_id=public_id).first()
    if image:
        # Borrar de Cloudinary
        cloudinary_response = delete_image(public_id)
        # Borrar de la base de datos
        db.session.delete(image)
        db.session.commit()
        return jsonify({'message': 'Imagen borrada exitosamente', 'cloudinary_response': cloudinary_response})
    else:
        return jsonify({'error': 'Imagen no encontrada'}), 404
# ------------------


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
    user_exists = User.query.filter_by(email=user_email).first()
    if user_exists:
        return {'message': 'Email is already registered'}, 400  # Mensaje de error si ya está registrado
    
    if user_nombre is None or user_email is None or user_contraseña is None:
        return {'message': 'Missing arguments'}, 400     
    bpassword = bytes(user_contraseña, 'utf-8')
    salt = bcrypt.gensalt(14)
    hashed_password = bcrypt.hashpw(password=bpassword, salt=salt)       
    user = User(user_nombre, user_email, hashed_password.decode('utf-8'))    
    #return {'message': f'nombre: {user.nombre} email: {user.email} contraseña: {contraseña}'}
    db.session.add(user)
    db.session.commit()
    return {'message': f'User {user.email} was created'}

@api.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    contraseña = data.get("contraseña")
    direccion = data.get("direccion")
    descripcion = data.get("descripcion")
    esta_activo = data.get("esta_activo")

    if nombre:
        user.nombre = nombre
    if email:
        user.email = email
    if contraseña:
        user.contraseña = contraseña
    if direccion:
        user.direccion = direccion
    if descripcion:
        user.descripcion = descripcion
    if esta_activo is not None:
        user.esta_activo = esta_activo

    db.session.commit()
    return jsonify(user.serialize())

@api.route("/users/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

@api.route('/token', methods=['POST'])
def create_token():
    body = request.get_json()
    email = body.get('email', None)
    contraseña = body.get('contraseña', None)
    if contraseña is None or email is None:
        return {'message': f'missing parameters {email} {contraseña}', 'authorize': False}, 400
    if check(email) is not True:
        return {'message': 'email is not valid', 'authorize': False}, 400
    user = User.query.filter_by(email=email).one_or_none()    
    if user is None:
        return {'mesasge': 'User doesnt exist', 'authorize': False}, 400
    password_byte =bytes(contraseña, 'utf-8')
    if bcrypt.checkpw(password_byte, user.contraseña.encode('utf-8')):
        return {'token': create_access_token(identity = email), 'authorize': True},200
    return {'message': 'Unauthorized', 'authorize': False}, 401

@api.route('/profile/user')
@jwt_required()
def validate_user():
    email = get_jwt_identity()    
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return {'message': 'Unauthorized'}, 401
    return user.serialize(), 200


@api.route('/check-email', methods=['POST'])
def check_email():
    body = request.get_json()
    email = body.get('email', None)
    if email is None:
        return {'message': 'Email is required'}, 400

    # Verificar si el correo existe en la base de datos
    user = User.query.filter_by(email=email).first()  # Buscar usuario por correo electrónico
    if user:
        return jsonify({'exists': True})  # El correo ya está registrado
    else:
        return jsonify({'exists': False})  # El correo no está registrado
    





@api.route('/companies/add', methods=['POST'])
def add_company():
    data = request.get_json()
    print("data", data)
    new_company = Company(
        nombre=data['nombre'],
        pais=data['pais'],
        sector=data['sector'],
        email=data['email'],
        telefono=data['telefono'],
        web=data['web'],
        direccion=data['direccion'],
        descripcion=data['descripcion'],
        cif=data['cif']
    )
    
    db.session.add(new_company)
    db.session.commit()
    return jsonify(new_company.serialize()), 201


@api.route('/initial-companies', methods=['GET'])
def get_initial_companies():
    with open('src/front/utils/mockData_Companies.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    # Desglosamos los datos en una lista única
    companies = []
    for sector_dict in data:
        for sector, company_list in sector_dict.items():
            companies.extend(company_list)

    # Creamos y subimos todas las empresas al servidor
    for company in companies:
        new_company = Company(
            nombre=company['nombre'],
            pais=company['pais'],
            sector=company['sector'],
            email=company['email'],
            telefono=company['telefono'],
            web=company['web'],
            direccion=company['direccion'],
            descripcion=company['descripcion'],
            cif=company['cif']
        )
        db.session.add(new_company)
        db.session.commit()

    return jsonify({"message": "Initial companies added"}), 201
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)






@api.route('/companies', methods=['GET'])
def get_companies():
    companies = Company.query.all()
    companies_serialized = [company.serialize() for company in companies]
    return jsonify(companies_serialized), 200


@api.route('/companies/<int:company_id>', methods=['GET'])
def get_company_byID(company_id):
    company = Company.query.get(company_id)
    if company is None:
        return jsonify({"message": "Company not found"}), 404
    return jsonify(company.serialize()), 200


# @api.route('/profile/companies', methods=['POST'])
# def create_company():
#     """Crea una nueva compañía"""
#     body = request.get_json()
    
#     nif = body.get('nif', None)
#     nombre = body.get('nombre', None)
#     sector = body.get('sector', None)
#     direccion = body.get('direccion', None)
#     email = body.get('email', None)
#     descripcion = body.get('descripcion', None)
#     web = body.get('web', None)
#     contraseña = body.get('contraseña', None)
#     certificado = body.get('certificado', None)
    
#     if not all([nif, nombre, sector, direccion, email, descripcion, web]):
#         return jsonify({"message": "Missing required fields"}), 400

#     # Verificar si ya existe una compañía con el mismo NIF o email
#     if Company.query.filter((Company.nif == nif) | (Company.email == email)).first():
#         return jsonify({"message": "Company with this NIF or email already exists"}), 400

#     company = Company(
#         nif=nif,
#         nombre=nombre,
#         sector=sector,
#         direccion=direccion,
#         email=email,
#         descripcion=descripcion,
#         web=web,
#         contraseña=contraseña,
#         certificado=certificado
#     )
    
#     db.session.add(company)
#     db.session.commit()
#     return jsonify(company.serialize()), 201


# @api.route('/profile/companies/<int:company_id>', methods=['PUT'])
# def update_company(company_id):
#     """Actualiza los datos de una compañía existente"""
#     body = request.get_json()
#     company = Company.query.get(company_id)
    
#     if company is None:
#         return jsonify({"message": "Company not found"}), 404

#     company.nif = body.get('nif', company.nif)
#     company.nombre = body.get('nombre', company.nombre)
#     company.sector = body.get('sector', company.sector)
#     company.direccion = body.get('direccion', company.direccion)
#     company.email = body.get('email', company.email)
#     company.descripcion = body.get('descripcion', company.descripcion)
#     company.web = body.get('web', company.web)
#     company.contraseña = body.get('contraseña', company.contraseña)
#     company.certificado = body.get('certificado', company.certificado)

#     db.session.commit()
#     return jsonify(company.serialize()), 200


# @api.route('/profile/companies/<int:company_id>', methods=['DELETE'])
# def delete_company(company_id):
#     """Elimina una compañía por ID"""
#     company = Company.query.get(company_id)
#     if company is None:
#         return jsonify({"message": "Company not found"}), 404

#     db.session.delete(company)
#     db.session.commit()
#     return jsonify({"message": f"Company {company_id} deleted"}), 200


