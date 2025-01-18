from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



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
            "esta_activo": True
            # do not serialize the password, its a security breach
        }

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    direccion = db.Column(db.String(255), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    pais = db.Column(db.String(20), nullable=False)
    cif = db.Column(db.String(20), unique=True, nullable=True)
    web = db.Column(db.String(120), unique=True, nullable=False)
    sector = db.Column(db.Text, nullable=True)
    imagen = db.Column(db.String(255), nullable=True)
    descripcion = db.Column(db.Text, nullable=True)
    favorited = db.relationship('Favorite', backref='company_favorite', lazy=True)


    def __init__(self,cif,nombre,sector,direccion,email,descripcion,web,imagen,pais,telefono):
        self.nombre = nombre
        self.email = email
        self.direccion = direccion
        self.pais = pais
        self.telefono = telefono
        self.cif = cif
        self.web = web
        self.sector = sector
        self.imagen = imagen
        self.descripcion = descripcion

    def __repr__(self):
        return f'<Company {self.nombre}>'

    def serialize(self):
        return {
            "nombre": self.nombre,
            "email": self.email,
            "direccion": self.direccion,
            "pais": self.pais,
            "telefono": self.telefono,
            "cif": self.cif,
            "web": self.web,
            "sector": self.sector,
            "imagen": self.imagen,
            "descripcion": self.descripcion
        }
    
    

    
