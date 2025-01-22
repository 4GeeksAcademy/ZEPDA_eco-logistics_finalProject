import cloudinary
import cloudinary.uploader
import cloudinary.api

def upload_image(file,folder):
    print('filename: ', file.filename)
    response = cloudinary.uploader.upload(
        file, 
        display_name=file.filename,
        asset_folder=f'zepda/images/{folder}',
        upload_preset='add_image_zepda',
        overwrite=True, 
        resource_type='image' 
    )
    return response

def delete_image(public_id):
    response = cloudinary.uploader.destroy(
        public_id,
        invalidate=True,
        upload_preset='add_image_zepda'
    )
    return response
