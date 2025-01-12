import React, { Component, useEffect, useState } from "react";
import zepdaImagotipo from "../../img/zepdaimagotipoz.png";
import { Link } from "react-router-dom";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";// importa los iconos para mostrar la contraseña
export const Footer = () => {
	const [showModal, setShowModal] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [passwordStrength, setPasswordStrength] = useState(0);// para la barra de fuerza de contraseña
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [passwordView, setPasswordView] = useState(false); //para ver la contraseña

	// Para cambiar entre login y registro
	const toggleForm = () => setIsLogin(!isLogin); 

	//borra los campos cuando se abre
	useEffect(() =>{
		if(showModal){
			setEmail("");
			setPassword("");
			setName("");
			setConfirmPassword("");
			setErrorMessage("");
			setPasswordStrength(0);
		}
	}, [showModal]);
	
// funcion para Validar la contraseña con mayuscula, minuscula y numero
	const Validpassword = (password) =>{
		const mayuscula = /[A-Z]/;
		const minuscula = /[a-z]/;
		const numero = /\d/;
		return (
			mayuscula.test(password) && minuscula.test(password) && numero.test(password)
		);
	};

// Funcion para medir la fuerza de la contraseña
	const strengthPassword = (password) => {
		let strength =0;
		if (password.length > 6) strength +=1;
		if (/[A-Z]/.test(password)) strength +=1;
		if (/[a-z]/.test(password)) strength +=1;
		if (/\d/.test(password)) strength +=1;
		return strength;
	};
// Funcion para validar el correo(vericar el formato)
const validEmail =(email) => {
	const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailFormat.test(email);
};
// funcion del evento contraseña
const handlePasswordChange = (e) => {
	const value = e.target.value;
	setPassword(value);
	const strength = strengthPassword(value)
	setPasswordStrength(strength);
};

// Funcion del envio para el login
const handleLoginSubmit = (e) =>{
	e.preventDefault();
	if (!email || !password){
		setErrorMessage(
			"Por favor, ingrese ambos campos: correo electrónico y contraseña."
		);
		return;
	}
	setErrorMessage("");
	// Aqui se puede añadir la logica para el login
};
// Funcion para el envio del registro
const handleRegisterSubmit = (e) => {
	e.preventDefault();
	//valida que todos los campos este llenos
	if (!name || !email || !password || !confirmPassword){
		setErrorMessage("Todos los campos son oblligatorios.");
		return;
	}
//validar el correo tenga el formato correcto
if (!validEmail(email)){
	setErrorMessage("Por favor, ingresa un correo electrónico válido.")
	return;
}
// validar las contraseñas
if (password !== confirmPassword){
	setErrorMessage("Las contraseñas no coinciden.");
	return;
}
// Validar que las contraseña sea fuerte
if (!Validpassword(password)){
	setErrorMessage(
		"La contraseña debe contener al menos una mayuscula, una minuscula y un número");
	return;
}

setErrorMessage("");
setShowModal(false); //cerrar el modal de registro
setShowSuccessModal(true);//Mostrar el modal de exito

//mostrar el modal de exito por 3 segundos
setTimeout(() =>{
	setShowSuccessModal(false);
}, 3000);
	//aqui se puede agregar la logica para el registro
};

// Funcion para alternar la visibilidad de la contraseña
const togglePasswordView = () => setPasswordView(!passwordView);
	
return (
  <>
	<footer className="container footer d-flex mt-5 ">
	<div>
	<img className="logofooter" src={zepdaImagotipo} alt="zepdaimagotipo" height={100} />
	</div>
	<div>
		<h5>ZEPDA Eco-logistics © 2025 </h5>
	</div>

	<div className="text-end footerlinks mt-3">
		<Link className="links" to="#" onClick={()=> setShowModal(true)}>
		<p>Área de socios</p>
		</Link>
		<Link className="links" to="/contacto"><p>Contacto</p></Link>
		<Link className="links" to="/quienesSomos"><p>Quiénes somos</p></Link>
	</div>
	</footer>

	{/* Modal Área de socios */}
	<Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isLogin ? "Área de socios - Login" : "Área de socios - Registro"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <div>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={passwordView ? "text" : "password"}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu contraseña"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordView}
                    >
                      {passwordView ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <Button variant="primary" type="submit">
                  Iniciar sesión
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <form onSubmit={handleRegisterSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre"
                  />
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={passwordView ? "text" : "password"}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Ingresa tu contraseña"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={togglePasswordView}
                    >
                      {passwordView ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <ProgressBar
                    now={(passwordStrength / 4) * 100}
                    variant={
                      passwordStrength === 1
                        ? "danger"
                        : passwordStrength === 2
                        ? "warning"
                        : passwordStrength === 3
                        ? "success"
                        : ""
                    }
                    label={
                      passwordStrength === 1
                        ? "Débil"
                        : passwordStrength === 2
                        ? "Moderada"
                        : passwordStrength === 3
                        ? "Fuerte"
                        : ""
                    }
                    className="mt-2"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirma tu contraseña"
                  />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Registrar
                </Button>
              </form>
            </div>
          )}

          {/* Mostrar mensaje de error */}
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-rojo" 
            onClick={() => setShowModal(false)}
          >
            Cerrar
          </Button>
          <Button variant="link" onClick={toggleForm}>
            {isLogin
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de éxito al registrar */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡Registro Exitoso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Usuario registrado con éxito.</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-rojo" 
            onClick={() => setShowSuccessModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
