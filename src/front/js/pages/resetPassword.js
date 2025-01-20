import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from 'jwt-decode';

export const ResetPassword = () => {
  const { decodeToken } = useParams();
  console.log(decodeToken);
  const [token] = useState(atob(decodeToken.split("'")[1]));
  const { store, actions } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();


  // Verificar si el token está expirado
  const isTokenExpired = (token) => {
    try {
      let decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;  // Convertimos a segundos
      const expirationTime = decodedToken.exp;
      const issuedAtTime = decodedToken.iat; // Obtener el tiempo de emisión

      console.log("Tiempo actual:", currentTime);
      console.log("Tiempo de expiración del token:", expirationTime);
      console.log("Tiempo de emisión del token:", issuedAtTime);

     
      if (expirationTime < currentTime) {
        console.log("Token ha expirado");
        return true;
      }

      return false;
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
    if (!token) {
      setErrorMessage("Token no proporcionado.");
      return;
    }

    const tokenToUse = token || store.token;  

    if (isTokenExpired(tokenToUse)) {
      setErrorMessage("El token ha expirado.");
      return;
    }

    if (isTokenInvalid(tokenToUse)) {
      setErrorMessage("El token es inválido.");
      return;
    }

    console.log("Token recibido:", tokenToUse);
  }, [token, store.token]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    const tokenToUse = token || store.token;  // Si el token en la URL no está, usamos el token del store

    if (isTokenExpired(tokenToUse)) {
      setErrorMessage("El token ha expirado.");
      return;
    }

    if (isTokenInvalid(tokenToUse)) {
      setErrorMessage("El token es inválido.");
      return;
    }

    try {
      console.log("Enviado solicotid de restablecimiento de contraseña...");
      await actions.resetPassword(password, confirmPassword, tokenToUse);
      alert("Contraseña restablecida con éxito.");
      navigate("/");  
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      setErrorMessage(error.message || "Hubo un problema al restablecer la contraseña.");
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
