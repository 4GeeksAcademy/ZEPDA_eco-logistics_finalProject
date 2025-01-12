from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contraseña = db.Column(db.String(200), unique=False, nullable=False)
    esta_activo = db.Column(db.Boolean(), unique=False, nullable=False)

    def __init__(self, nombre, email, contraseña):
        self.nombre = nombre
        self.email = email
        self.contraseña = contraseña
        self.esta_activo = True

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "nombre": self.nombre,
            "email": self.email,
            "esta_activo": True
            # do not serialize the password, its a security breach
        }

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nif = db.Column(db.String(20), unique=True, nullable=False)
    nombre = db.Column(db.String(120), nullable=False)
    sector = db.Column(db.Text, nullable=False)
    direccion = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    web = db.Column(db.String(120), unique=True, nullable=False)
    contraseña = db.Column(db.String(200), nullable=False)
    certificado = db.Column(db.String(120), nullable=True)


    def __init__(self,nif,nombre,sector,direccion,email,descripcion,web,contraseña,certificado):
        self.nif = nif
        self.nombre = nombre
        self.sector = sector
        self.direccion = direccion
        self.email = email
        self.descripcion = descripcion
        self.web = web
        self.contraseña = contraseña
        self.certificado = certificado

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
            "contraseña": self.contraseña,
            "certificado": self.certificado,
        }
    