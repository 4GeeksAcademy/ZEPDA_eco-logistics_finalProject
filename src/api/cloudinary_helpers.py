# cloudinary_helpers.py
import cloudinary
import cloudinary.uploader
import cloudinary.api
# from cloudinary.uploader import upload 
# from cloudinary.utils import cloudinary_url

def upload_image(file):
    response = cloudinary.uploader.upload(file)
    return response

def get_image_url(public_id):
    url, options = cloudinary.utils.cloudinary_url(public_id)
    return url
