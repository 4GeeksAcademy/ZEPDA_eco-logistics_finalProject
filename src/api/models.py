from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=True)

    def __repr__(self):
        return f'<Image {self.public_id}>'
    
    def serialize(self):
       return{
              "id": self.id,
              "public_id": self.public_id,
              "url": self.url,
              "created_at": self.created_at
       }




#***********************************FAVORITES***********************************************



class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))

    def __repr__(self):
        return f'<Favorite {self.id}>'

    def serialize(self):
       return{
              "id": self.id,
              "user_id": self.user_id,
              "company_id": self.company_id
       }
                           

#*******************************************USER***************************************************

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contraseña = db.Column(db.String(200), unique=False, nullable=False)
    direccion = db.Column(db.String(120), unique=False, nullable=True)
    descripcion = db.Column(db.String(500), unique=False, nullable=True)
    esta_activo = db.Column(db.Boolean(), unique=False, nullable=False)
    favorite_company = db.relationship('Favorite', backref='users_favorite', lazy=True)

    image = db.relationship('Image', backref='user', uselist=False) # Relación uno a uno con Image

    def __init__(self, nombre, email, contraseña):
        self.nombre = nombre
        self.email = email
        self.contraseña = contraseña
        self.esta_activo = True

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "direccion": self.direccion,
            "descripcion": self.descripcion,
            "esta_activo": True,
            "image": self.image.serialize() if self.image else None # Serializa la imagen si existe
            # do not serialize the password, its a security breach
        }

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nif = db.Column(db.String(20), unique=True, nullable=True)
    nombre = db.Column(db.String(120), nullable=False)
    sector = db.Column(db.Text, nullable=True)
    direccion = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    web = db.Column(db.String(120), unique=True, nullable=False)

    image = db.relationship('Image', backref='company', uselist=False) # Relación uno a uno con Image
    favorited = db.relationship('Favorite', backref='company_favorite', lazy=True)


    def __init__(self,nif,nombre,sector,direccion,email,descripcion,web):
        self.nif = nif
        self.nombre = nombre
        self.sector = sector
        self.direccion = direccion
        self.email = email
        self.descripcion = descripcion
        self.web = web

    def __repr__(self):
        return f'<Company {self.nombre}>'

    def serialize(self):
        return {
            "nif": self.nif,
            "nombre": self.nombre,
            "sector": self.sector,
            "direccion": self.direccion,
            "email": self.email,
            "descripcion": self.descripcion,
            "web": self.web,
            "image": self.image.serialize() if self.image else None # Serializa la imagen si existe
        }
    
    

    
