# cloudinary_helpers.py
import cloudinary
import cloudinary.uploader
import cloudinary.api

def upload_image(file):
    response = cloudinary.uploader.upload(file)
    return response

def delete_image(public_id):
    response = cloudinary.uploader.destroy(public_id)
    return response
