  
import os
from flask_admin import Admin
from .models import db, User, Company
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'slate'
    admin = Admin(app, name='ZEPDA C.P.', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Company, db.session))
    #admin.add_view(ModelView(Favorites, db.session))
    #admin.add_view(ModelView(Rating, db.session))
    #admin.add_view(ModelView(TypeService, db.session))
    #admin.add_view(ModelView(Hirings, db.session))
    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))