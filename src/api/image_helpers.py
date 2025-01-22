# image_helpers.py
from api.models import db, Image
from api.cloudinary_helpers import delete_image

def assign_image_to_user(user, image_id):
    # Eliminar la imagen anterior si existe
    if user.image:
        delete_image(user.image.public_id)  # Borrar de Cloudinary
        db.session.delete(user.image)  # Borrar de la base de datos
    
    # Asociar la nueva imagen
    image = Image.query.get(image_id)
    user.image = image
    db.session.commit()

def assign_image_to_company(company, image_id):
    # Eliminar la imagen anterior si existe
    if company.image:
        delete_image(company.image.public_id)  # Borrar de Cloudinary
        db.session.delete(company.image)  # Borrar de la base de datos
    
    # Asociar la nueva imagen
    image = Image.query.get(image_id)
    company.image = image
    db.session.commit()

def create_image(response):
    # Crear el modelo Image y añadirlo a la base de datos
    new_image = Image(public_id=response['public_id'], url=response['secure_url'])
    db.session.add(new_image)
    db.session.commit()
    return new_image
