"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import app
from flask import Flask, Blueprint, request, jsonify, url_for, current_app
from api.models import Hirings, db, User, Company, Image, Favorite
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_mail import Message
from datetime import timedelta
import base64
import re
import bcrypt
import json
import os
from api.cloudinary_helpers import upload_image, delete_image
from api.image_helpers import assign_image_to_user, assign_image_to_company, create_image

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


def check(email):
    if not email:
        return False
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    if(re.fullmatch(regex, email)):
        return True
    else:
        return False    
    
# --- CLOUDINARY ---
@api.route('/upload', methods=['POST'])
def upload_file():
    # Verificar que los datos están llegando correctamente
    file = request.files['file']
    type = request.form.get('type')
    print(f'file: {file}')
    print(f'type: {type}')

    if file and file.filename:
        print(f'Nombre del archivo: {file.filename}')
        content_length = file.content_length or len(file.stream.read())
        print(f'Tamaño del archivo: {content_length} bytes')
        file.stream.seek(0)  # Volver al inicio del archivo después de leer el contenido

        # Subir el archivo a Cloudinary
        response = upload_image(file,type)
        
        # Crear el modelo Image y añadirlo a la base de datos
        new_image = create_image(response)

        # Verificar que se subió correctamente
        # print(f'upload response: {response}')
        return jsonify(new_image.serialize()), 201
    else:
        return jsonify({'error': 'Archivo vacío o no seleccionado'}), 400
    

@api.route('/associate_image', methods=['PUT'])
def associate_image():
    type = request.form.get('type')
    id = request.form.get('id')
    image_id = request.form.get('image_id')  # ID de la nueva imagen (puede ser null)

    print(f'type: {type}')
    print(f'id: {id}')
    print(f'image_id: {image_id}')

    if type == 'user':
        user = User.query.get(id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        if image_id:
            assign_image_to_user(user, image_id)
        else:
            if user.image:
                delete_image(user.image.public_id)  # Borrar de Cloudinary
                db.session.delete(user.image)  # Borrar de la base de datos
                user.image = None
                db.session.commit()

    elif type == 'company':
        company = Company.query.get(id)
        if not company:
            return jsonify({'error': 'Compañía no encontrada'}), 404

        if image_id:
            assign_image_to_company(company, image_id)
        else:
            if company.image:
                delete_image(company.image.public_id)  # Borrar de Cloudinary
                db.session.delete(company.image)  # Borrar de la base de datos
                company.image = None
                db.session.commit()

    else:
        return jsonify({'error': 'Tipo de modelo no válido'}), 400

    return jsonify({'image_id': image_id, 'message': 'Imagen actualizada correctamente'})


# ------------------
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
    
@api.route('/public_id/<image_id>', methods=['GET'])
def get_publicID(image_id):
    image = Image.query.get(image_id)
    if image:
        return jsonify({'public_id': image.public_id})
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


@api.route('/test-email', methods=['GET'])
def test_email():
    from app import mail
    try: 
        sender_email = current_app.config['MAIL_USERNAME']  
        msg = Message(
            'Correo de prueba con enlace',  
            sender=sender_email,
            recipients=['empresasarn@gmail.com']  
        )
        frontend_url ="https://silver-space-pancake-4j9rvrxg7jrfjvw9-3000.app.github.dev/contacto"
        msg.html = f'''
            <p>Este es un correo de prueba enviado desde la aplicación Flask.</p>
            <p>Puedes hacer clic en el siguiente enlace para más detalles:</p>
            <p><a href="{frontend_url}">Haz clic aquí</a></p>
        '''
        mail.send(msg)
        return jsonify({"message": "Correo enviado exitosamente"})
    except Exception as e:
        return jsonify({"error": "No se puede enviar el correo: " + str(e)}), 500

@api.route('/request-reset-password', methods=["POST"])
def request_reset_password():
    from app import mail
    email = request.json.get("email")

    if not check(email):
        return jsonify({"error": "Formato de correo electrónico inválido"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Correo electrónico no registrado"}), 404
    token = create_access_token(identity=email, expires_delta=timedelta(minutes=5))
    token_byte = token.encode('utf-8')
    token = base64.b64encode(token_byte)
    front_end = os.getenv("FRONTEND_URL")
    reset_link = f"{front_end}reset-password/{token}"

    try:
        sender_email = current_app.config['MAIL_USERNAME']    
        msg = Message(
            'Restablecimiento de Contraseña',
            sender=sender_email,
            recipients=[email]
        )
        msg.html = f'<p>Haz clic para restablecer la contraseña: <a href="{reset_link}">Restablecer contraseña</a></p>'
        mail.send(msg)

        return jsonify({"message": "Correo enviado exitosamente"})
    except Exception as e:
        return jsonify({"error": "No se puede enviar el correo: " + str(e)}), 500

@api.route('/reset-password', methods=["POST"])
@jwt_required()  # Asegura que el usuario esté autenticado
def reset_password():
    try:
        # Obtener los datos enviados por el cliente
        user_data = request.get_json()
        email = get_jwt_identity()  # El email del usuario que hizo la solicitud (extraído del JWT)
        
        if 'password' not in user_data or 'confirm_password' not in user_data:
            return jsonify({"msg": "Faltan campos de contraseña"}), 400
        
        if user_data['password'] != user_data['confirm_password']:
            return jsonify({"msg": "Las contraseñas no coinciden"}), 400

       
        password = user_data['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14)).decode('utf-8')

        # Buscar el usuario en la base de datos
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        user.contraseña = hashed_password
        db.session.commit()

        return jsonify({"msg": "Contraseña actualizada con éxito"}), 200

    except Exception as e:
        print(f"Error al procesar la solicitud: {e}")
        return jsonify({"msg": "Hubo un error al restablecer la contraseña"}), 500


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
        cif=data['cif'],
        imagen_url=data['imagen']
    )
    
    db.session.add(new_company)
    db.session.commit()
    return jsonify(new_company.serialize()), 201


@api.route('/initial-companies', methods=['POST'])
def get_initial_companies():
    # with open('src/front/utils/mockData_Companies.json', 'r', encoding='utf-8') as file:
    #     data = json.load(file)
    data = request.get_json()
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
            cif=company['cif'],
            imagen_url=company['imagen_url']
        )
        db.session.add(new_company)
        db.session.commit()

    return jsonify({companies}), 201
    

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

@api.route('/initialCompanies-images', methods=['GET'])
def initialCompanies_images():
    # Leer el archivo JSON y devolverlo como respuesta
    with open('src/front/utils/mockData_Companies.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
    return jsonify(data), 200


# @api.route('/initialCompanies-images', methods=['POST'])
# def initialCompanies_images():
#     # Leer el archivo JSON
#     with open('src/front/utils/mockData_Companies.json', 'r', encoding='utf-8') as file:
#         data = json.load(file)
    
#     # Recoge las rutas de las imágenes y las asocia a cada empresa
#     for sector_dict in data:
#         for sector, company_list in sector_dict.items():
#             for company in company_list:
#                 image_path = company.get('imagen')
#                 if image_path:
#                     # Simulación de carga de imagen
#                     with open('src/front/img/logos/'+image_path, 'rb') as img_file:
#                         files = {'file': img_file}
#                         response = requests.post(os.environ.get('BACKEND_URL')+'upload', files=files, data={'type': 'company'})
#                         print(response)
#                         if response.status_code == 201:
#                             image_data = response.json()
#                             # Asociar la imagen a la empresa
#                             requests.put(os.environ.get('BACKEND_URL')+'associate_image', data={
#                                 'type': 'company',
#                                 'id': company['id'],
#                                 'image_id': image_data['id']
#                             })
    
#     return jsonify({"message": "Images associated successfully"}), 200




#FAVORITOS

@api.route("/favorites", methods=["POST"])
def add_favorite():
    body = request.get_json()
    user_id = body.get("user_id")
    company_id = body.get("company_id")

    favorite = Favorite(user_id=user_id, company_id=company_id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify(favorite.serialize()), 201


@api.route("/favorites/<int:id>", methods=["GET"])
def get_favorites(id):
    favorites = db.session.query(Favorite).join(Company).filter(Favorite.user_id==id).all()
    favorited_ids = [favorite.company_id for favorite in favorites]
    companies = Company.query.filter(Company.id.in_(favorited_ids)).all()
    companies_serialize = [company.serialize() for company in companies]
    return jsonify(companies_serialize), 200



@api.route("/favorites/delete", methods=["POST"])   
def remove_favorite():
    data = request.get_json()
    company_id = data.get('company_id')
    user_id = data.get('user_id')
    
    favorite = Favorite.query.filter_by(company_id=company_id, user_id=user_id).first()
    if not favorite:
        return jsonify({"message": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite removed successfully"}), 200



# #***********************************CONTRATACIONES***********************************************

@api.route('/hirings', methods=['POST'])
def add_hiring():
    body = request.get_json()
    user_id = body.get("user_id")
    company_id = body.get("company_id")

    hiring = Hirings(user_id=user_id, company_id=company_id)
    db.session.add(hiring)
    db.session.commit()

    return jsonify(hiring.serialize()), 201


@api.route('/hirings', methods=['GET'])
def get_hirings():
    hirings = Hirings.query.all()
    hirings_serialized = [hiring.serialize() for hiring in hirings]
    return jsonify(hirings_serialized), 200


@api.route('/hirings/<int:id>', methods=['DELETE'])
def remove_hiring(id):
    hiring = Hirings.query.get(id)
    if not hiring:
        return jsonify({"message": "Hiring not found"}), 404

    db.session.delete(hiring)
    db.session.commit()
    return jsonify({"message": "Hiring removed successfully"}), 200 























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


