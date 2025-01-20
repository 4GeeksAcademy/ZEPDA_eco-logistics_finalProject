import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from 'jwt-decode';

export const ResetPassword = () => {
  const { Token } = useParams();  
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Verificar si el token ha expirado
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      return decodedToken.exp < currentTime; 
    } catch (error) {
      return true;  
    }
  };

  // Verificar si el token es inválido
  const isTokenInvalid = (token) => {
    try {
      jwtDecode(token);  
      return false;  
    } catch (error) {
      return true;  
    }
  };

  useEffect(() => {
    if (!Token) {
      setErrorMessage("Token no proporcionado.");
      return;
    }

    const tokenToUse = Token || store.token;

    if (isTokenExpired(tokenToUse)) {
      setErrorMessage("El token ha expirado.");
      return;
    }

    if (isTokenInvalid(tokenToUse)) {
      setErrorMessage("El token es inválido.");
      return;
    }

    console.log("Token recibido:", tokenToUse); 
  }, [Token, store.token]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    const tokenToUse = Token || store.token;

    if (isTokenExpired(tokenToUse)) {
      setErrorMessage("El token ha expirado.");
      return;
    }

    if (isTokenInvalid(tokenToUse)) {
      setErrorMessage("El token es inválido.");
      return;
    }

    try {
      await actions.resetPassword(password, confirmPassword, tokenToUse);
      alert("Contraseña restablecida con éxito.");
      navigate("/");  
    } catch (error) {
      setErrorMessage(error.message || "Hubo un problema al restablecer la contraseña.");
      console.error("Error al restablecer la contraseña:", error);
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <input
        type="password"
        placeholder="Nueva Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Restablecer Contraseña</button>
    </div>
  );
};
