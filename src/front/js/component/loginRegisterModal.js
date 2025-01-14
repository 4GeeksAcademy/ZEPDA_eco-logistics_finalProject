import React, { useState, useEffect } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const LoginRegisterModal = ({ showModal, handleCloseModal, isLogin, toggleForm, actions }) => {
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    password_check: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Para el mensaje de éxito
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validEmail = (email) => {
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailFormat.test(email);
  };

  const Validpassword = (password) => {
    const mayuscula = /[A-Z]/;
    const minuscula = /[a-z]/;
    const numero = /\d/;
    return (
      mayuscula.test(password) && minuscula.test(password) && numero.test(password)
    );
  };

  const strengthPassword = (password) => {
    let strength = 0;
    if (password.length > 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, contraseña: value });
    const strength = strengthPassword(value);
    setPasswordStrength(strength);
  };

  useEffect(() => {
    setErrorMessage(""); // Limpiar mensaje de error al cambiar entre login y registro
    setSuccessMessage(""); // Limpiar mensaje de éxito
  }, [isLogin]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.contraseña) {
      setErrorMessage("Por favor, ingrese ambos campos: correo electrónico y contraseña.");
      return;
    }

    if (!validEmail(user.email)) {
      setErrorMessage("El correo electrónico no tiene un formato válido.");
      return;
    }

    setErrorMessage(""); // Limpiar el mensaje de error si es válido

    const loginResponse = await actions.loginUser(user);
    if (loginResponse) {
      setSuccessMessage("Login exitoso"); // Mensaje de éxito
      setTimeout(() => {
        setSuccessMessage("");  // Limpiar mensaje de éxito
        handleCloseModal();    // Cerrar el modal de inmediato
        setUser({
          nombre: "",
          email: "",
          contraseña: "",
          password_check: "",
        });  // Vaciar campos
        navigate("/dashboard-user"); // Redirigir al dashboard de usuario
      }, 200);  // Cierre instantáneo y redirección
    } else {
      setErrorMessage("Usuario o contraseña incorrectos.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.contraseña || !user.password_check || !user.nombre) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }

    if (!validEmail(user.email)) {
      setErrorMessage("El correo electrónico no tiene un formato válido.");
      return;
    }

    if (user.contraseña !== user.password_check) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    if (!Validpassword(user.contraseña)) {
      setErrorMessage("La contraseña debe contener al menos una mayúscula, una minúscula y un número.");
      return;
    }

    const strength = strengthPassword(user.contraseña);
    if (strength < 3) {
      setErrorMessage("La contraseña no es lo suficientemente fuerte.");
      return;
    }

    // Verificar si el correo ya está registrado
    const emailExists = await actions.checkEmailExists(user.email); // Suponiendo que este método existe en actions

    if (emailExists) {
      setErrorMessage("El correo ya tiene una cuenta.");
      return;
    }

    setErrorMessage(""); // Limpiar el mensaje de error si todo es correcto

    const registerResponse = await actions.createUser(user);
    if (registerResponse) {
      setSuccessMessage("Usuario registrado correctamente!");  // Mensaje de éxito
      setTimeout(() => {
        setSuccessMessage("");  // Limpiar el mensaje de éxito
        handleCloseModal();    // Cerrar el modal de inmediato
        setUser({
          nombre: "",
          email: "",
          contraseña: "",
          password_check: "",
        });  // Vaciar campos
        navigate("/"); // Redirigir al dashboard de usuario
      }, 200);  // Cierre instantáneo y redirección
    }
  };

  useEffect(() => {
    setIsFormValid(user.email && user.contraseña && (isLogin ? true : user.password_check && user.nombre));
  }, [user, isLogin]);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Login" : "Registro"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                id="email"
                placeholder="Ingresa tu correo"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={user.contraseña}
                id="password"
                placeholder="Ingresa tu contraseña"
                onChange={handlePasswordChange}
              />
            </div>
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Iniciar sesión
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={user.nombre}
                id="name"
                placeholder="Ingresa tu nombre"
                onChange={(e) => setUser({ ...user, nombre: e.target.value })}
              />
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                id="email"
                placeholder="Ingresa tu correo"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={user.contraseña}
                id="password"
                placeholder="Ingresa tu contraseña"
                onChange={handlePasswordChange}
              />
              <ProgressBar
                now={(passwordStrength / 4) * 100}
                variant={passwordStrength === 1 ? "danger" : passwordStrength === 2 ? "warning" : passwordStrength === 3 ? "success" : "success"}
                label={passwordStrength === 1 ? "Débil" : passwordStrength === 2 ? "Moderada" : passwordStrength === 3 ? "Fuerte" : "Muy fuerte"}
                className="mt-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={user.password_check}
                id="confirmPassword"
                placeholder="Confirma tu contraseña"
                onChange={(e) => setUser({ ...user, password_check: e.target.value })}
              />
            </div>
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Registrar
            </Button>
          </form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="link" onClick={toggleForm}>
          {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
