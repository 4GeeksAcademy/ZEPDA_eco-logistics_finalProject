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