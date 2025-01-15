from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    email = db.Column(db.String(100))
    contraseña = db.Column(db.String(100))
    direccion = db.Column(db.String(200))
    descripcion = db.Column(db.String(200))
    esta_activo = db.Column(db.Boolean, default=True)

    def __init__(self, nombre, email, contraseña, direccion, descripcion, esta_activo=True):
        self.nombre = nombre
        self.email = email
        self.contraseña = contraseña
        self.direccion = direccion
        self.descripcion = descripcion
        self.esta_activo = esta_activo

    def __repr__(self):
        return f"<User {self.nombre}>"

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "direccion": self.direccion,
            "descripcion": self.descripcion,
            "esta_activo": self.esta_activo,
        }

@app.route("/api/users/<int:id>", methods=["PUT"])
def update_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    contraseña = data.get("contraseña")
    direccion = data.get("direccion")
    descripcion = data.get("descripcion")
    esta_activo = data.get("esta_activo")

    if nombre:
        user.nombre = nombre
    if email:
        user.email = email
    if contraseña:
        user.contraseña = contraseña
    if direccion:
        user.direccion = direccion
    if descripcion:
        user.descripcion = descripcion
    if esta_activo is not None:
        user.esta_activo = esta_activo

    db.session.commit()
    return jsonify(user.serialize())

if __name__ == "__main__":
    app.run(debug=True)
