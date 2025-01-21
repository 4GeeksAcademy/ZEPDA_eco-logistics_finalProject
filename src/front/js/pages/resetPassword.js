import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { ProgressBar } from "react-bootstrap";
import { jwtDecode } from 'jwt-decode';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const ResetPassword = () => {
  const { decodeToken } = useParams();
  const [token] = useState(atob(decodeToken.split("'")[1]));
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccesMessage] = useState("");
  const [isTokenExpiredState, setIsTokenExpiredState] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0); // Estado para el tiempo restante
  const [isPasswordValid, setIsPasswordValid] = useState(false); // Validación de la contraseña
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Verificar si el token está expirado
  const isTokenExpired = (token) => {
    try {
      let decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;  // Convertimos a segundos
      const expirationTime = decodedToken.exp;

      return expirationTime < currentTime;
    } catch (error) {
      return true;
    }
  };

  // Calcular el tiempo restante para la expiración del token
  const calculateTimeRemaining = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      const currentTime = Date.now() / 1000;  // Convertimos a segundos

      return Math.max(0, Math.floor(expirationTime - currentTime)); // Redondear el tiempo restante a un número entero
    } catch (error) {
      return 0;  // Si hay un error al decodificar el token, devolver 0
    }
  };

  useEffect(() => {
    if (!token) {
      setErrorMessage("Token no proporcionado.");
      return;
    }

    const tokenToUse = token || store.token;
    const remainingTime = calculateTimeRemaining(tokenToUse);

    if (remainingTime <= 0) {
      setErrorMessage("Lo sentimos, el tiempo de restablecer la contraseña ha finalizado.");
      setIsTokenExpiredState(true);
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
      return;
    }

    // Mostrar el tiempo restante
    setTimeRemaining(remainingTime);

    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = Math.max(0, prevTime - 1); // Redondear y no permitir tiempos negativos
        if (newTime === 0) {
          clearInterval(timerInterval); // Detener el temporizador cuando expire
          setIsTokenExpiredState(true);
          setErrorMessage("Lo sentimos, el tiempo de restablecer la contraseña ha finalizado.");
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Limpiar el intervalo al desmontar el componente
  }, [token, store.token]);

  // Validación de la contraseña
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(strengthPassword(value));
    setIsPasswordValid(validatePassword(value)); // Validar la contraseña
  };

  const strengthPassword = (password) => {
    let strength = 0;
    if (password.length > 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    return strength;
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    const tokenToUse = token || store.token;

    if (isTokenExpired(tokenToUse)) {
      setErrorMessage("El token ha expirado.");
      return;
    }

    try {
      await actions.resetPassword(password, confirmPassword, tokenToUse);
      setSuccesMessage("Contraseña restablecida con éxito.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || "Hubo un problema al restablecer la contraseña.");
    }
  };

  // Función para formatear el tiempo restante (solo minutos y segundos)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="d-flex justify-content-center" style={{ minHeight: "100vh", alignItems: "flex-start" }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%", marginTop: "50px" }}>
        <h1 className="text-center mb-4">Restablecer Contraseña</h1>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {!isTokenExpiredState && (
          <div className="alert alert-info">
            <strong>Tiempo restante para restablecer la contraseña:</strong> {formatTime(timeRemaining)}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Nueva Contraseña</label>
          <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            placeholder="Ingresa tu nueva contraseña"
            value={password}
            onChange={handlePasswordChange}
            disabled={isTokenExpiredState}
            required
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            onClick={()=> setShowPassword(!showPassword)}
            disabled={isTokenExpiredState}>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
          </button>
          </div>
          <ProgressBar
            now={(passwordStrength / 4) * 100}
            variant={passwordStrength === 1 ? "danger" : passwordStrength === 2 ? "warning" : passwordStrength === 3 ? "success" : "success"}
            label={passwordStrength === 1 ? "Débil" : passwordStrength === 2 ? "Moderada" : passwordStrength === 3 ? "Fuerte" : "Muy fuerte"}
            className="mt-2"
          />
          {!isPasswordValid && password.length > 0 && (
            <div className="text-danger mt-2">
              La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirma tu nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isTokenExpiredState}
            required
          />
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={handleResetPassword}
            disabled={!password || !confirmPassword || isTokenExpiredState || !isPasswordValid}
          >
            Restablecer Contraseña
          </button>
        </div>
      </div>
    </div>
  );
};
