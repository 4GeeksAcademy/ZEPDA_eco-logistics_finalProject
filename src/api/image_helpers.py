# image_helpers.py
from api.models import db, Image
from api.cloudinary_helpers import delete_image

def assign_image_to_user(user, response):
    if user.image:  # Si el usuario ya tiene una imagen
        delete_image(user.image.public_id)  # Borrar de Cloudinary
        db.session.delete(user.image)  # Borrar de la base de datos
    new_image = Image(public_id=response['public_id'], url=response['secure_url'], user=user)
    db.session.add(new_image)
    db.session.commit()

def assign_image_to_company(company, response):
    if company.image:  # Si la compañía ya tiene una imagen
        delete_image(company.image.public_id)  # Borrar de Cloudinary
        db.session.delete(company.image)  # Borrar de la base de datos
    new_image = Image(public_id=response['public_id'], url=response['secure_url'], company=company)
    db.session.add(new_image)
    db.session.commit()
