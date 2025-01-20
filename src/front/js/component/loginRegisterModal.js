import React, { useState, useEffect } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { FiEye, FiEyeOff } from "react-icons/fi";  

export const LoginRegisterModal = ({ showModal, handleCloseModal, actions }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginFields, setLoginFields] = useState({
    email: "",
    contraseña: "",
  });

  const [registerFields, setRegisterFields] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    password_check: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [loginAttemts,setLoginAttempts] = useState(0);
  const [showForgotPassword,setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  // Validaciones
  const validEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const Validpassword = (password) => /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && password.length >=8;
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
    if (isLogin) {
      setLoginFields({ ...loginFields, contraseña: value });
    } else {
      setRegisterFields({ ...registerFields, contraseña: value });
    }
    setPasswordStrength(strengthPassword(value)); 
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    if (showModal) {
      setErrorMessage("");
      setSuccessMessage("");
      setIsLogin(true);
      setLoginAttempts(0);
    }
  }, [showModal]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginFields.email || !loginFields.contraseña) {
      setErrorMessage("Por favor, ingrese ambos campos: correo electrónico y contraseña.");
      return;
    }
    if (!validEmail(loginFields.email)) {
      setErrorMessage("El correo electrónico no tiene un formato válido.");
      return;
    }

    const emailExists = await actions.checkEmailExists(loginFields.email);
    if (!emailExists) {
      setErrorMessage("El correo no tiene cuenta.");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    setErrorMessage("");
    const loginResponse = await actions.loginUser(loginFields);
    if (loginResponse) {
      setSuccessMessage("Login exitoso");
      setTimeout(() => {
        setSuccessMessage("");
        handleCloseModal();
        setLoginFields({
          email: "",
          contraseña: "",
        });
        setPasswordStrength(0); // Resetear la barra de progreso
        navigate("/dashboard-user");
      },);
    } else {
      setLoginAttempts((prev) => prev + 1);
      setErrorMessage("Usuario o contraseña incorrectos.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de los campos
    if (!registerFields.email || !registerFields.contraseña || !registerFields.password_check || !registerFields.nombre) {
      setErrorMessage("Por favor, complete todos los campos.");
      return;
    }
    if (!validEmail(registerFields.email)) {
      setErrorMessage("El correo electrónico no tiene un formato válido.");
      return;
    }
    if (registerFields.contraseña !== registerFields.password_check) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    if (!Validpassword(registerFields.contraseña)) {
      setErrorMessage("La contraseña debe tener 8 caracteres y contener al menos una mayúscula, una minúscula y un número.");
      return;
    }

    const strength = strengthPassword(registerFields.contraseña);
    if (strength < 4) {
      setErrorMessage("La contraseña no es lo suficientemente fuerte.");
      return;
    }

    const emailExists = await actions.checkEmailExists(registerFields.email);
    if (emailExists) {
      setErrorMessage("El correo ya tiene una cuenta.");
      return;
    }

    setErrorMessage("");


    // Crear el usuario
    const registerResponse = await actions.createUser(registerFields);
    if (registerResponse) {
      setSuccessMessage("Usuario registrado correctamente!");

      // Esperar unos segundos antes de redirigir
      handleCloseModal();
      setRegisterFields({
        nombre: "",
        email: "",
        contraseña: "",
        password_check: "",
      });

      setPasswordStrength(0);
      setShowRegistrationModal(true);

      setTimeout(async () => {
        const loginResponse = await actions.loginUser({
          email: registerFields.email,
          contraseña: registerFields.contraseña
        });

        if (loginResponse) {
          setShowRegistrationModal(false);
          navigate("/dashboard-user");
        } else {
          setErrorMessage("Hubo un error al iniciar sesión después del registro.");
        }
      },);
    }
  };

  useEffect(() => {
    // Hacer que el formulario sea válido según el tipo (Login o Registro)
    if (isLogin) {
      setIsFormValid(loginFields.email && loginFields.contraseña);  // Solo correo y contraseña en Login
    } else {
      setIsFormValid(registerFields.email && registerFields.contraseña && registerFields.password_check && registerFields.nombre);  // Todos los campos en Registro
    }
  }, [loginFields, registerFields, isLogin]);

  const toggleFormHandler = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    // Resetear campos cuando el modal se cierre
    if (!showModal) {
      setLoginFields({
        email: "",
        contraseña: "",
      });
      setRegisterFields({
        nombre: "",
        email: "",
        contraseña: "",
        password_check: "",
      });
      setPasswordStrength(0); // Reseteamos la fuerza de la contraseña cuando se cierra el modal
    }
  }, [showModal]);

  useEffect(() => {
    // Reseteamos la barra de progreso cuando cambiamos entre Login y Registro
    setPasswordStrength(0); // Restablecemos la fuerza de la contraseña cada vez que cambiamos entre formularios
  }, [isLogin]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  return (
    <>
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
                  value={loginFields.email}
                  id="email"
                  placeholder="Ingresa tu correo"
                  onChange={(e) => setLoginFields({ ...loginFields, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={loginFields.contraseña}
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    onChange={handlePasswordChange}
                  />
                  <span className="input-group-text" onClick={handlePasswordVisibility}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>
              <Button variant="secondary" type="submit" disabled={!isFormValid}>
                Iniciar sesión
              </Button>
              {loginAttemts >=3 && (
                <div className="mt-3">
                  <button variant="link" onClick={() => setShowForgotPassword(true)}>
                    ¿Olvidaste tu contraseña?
                  </button>
                  </div>
              )}
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={registerFields.nombre}
                  id="name"
                  placeholder="Ingresa tu nombre"
                  onChange={(e) => setRegisterFields({ ...registerFields, nombre: e.target.value })}
                />
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={registerFields.email}
                  id="email"
                  placeholder="Ingresa tu correo"
                  onChange={(e) => setRegisterFields({ ...registerFields, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={registerFields.contraseña}
                    id="password"
                    placeholder="Ingresa tu contraseña"
                    onChange={handlePasswordChange}
                  />
                  <span className="input-group-text" onClick={handlePasswordVisibility}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
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
                  value={registerFields.password_check}
                  id="confirmPassword"
                  placeholder="Confirma tu contraseña"
                  onChange={(e) => setRegisterFields({ ...registerFields, password_check: e.target.value })}
                />
              </div>
              <Button variant="secondary" type="submit" disabled={!isFormValid}>
                Registrar
              </Button>
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="success" onClick={toggleFormHandler}>
            {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
          </Button>
        </Modal.Footer>
      </Modal>
      <ForgotPasswordModal
        show={showForgotPassword}
        onHide={() => setShowForgotPassword(false)}
        onPasswordReset={actions.requestPasswordReset} 
      />
    </>
  );
};
