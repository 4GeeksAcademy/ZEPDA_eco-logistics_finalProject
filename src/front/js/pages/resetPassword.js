import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  // Cambié la importación aquí

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();  // Obtenemos el token desde los parámetros de la URL

  useEffect(() => {
    if (!token) {
      setErrorMessage("Token no proporcionado.");
      return;
    }

    try {
      // Primero decodificamos el token de Base64 (lo asumo en forma de cadena como "b'String'")
      const decodedToken = atob(token);  // Decodificamos el Base64

      // Ahora decodificamos el JWT con jwt-decode
      const payload = jwtDecode(decodedToken);  // Decodifica el JWT

      // Verificamos si el token tiene el campo 'exp' y si ha expirado
      const currentTime = Date.now() / 1000; // Obtener el tiempo actual en segundos
      if (payload.exp < currentTime) {
        setErrorMessage("El token ha expirado.");
        return;  // Si el token expiró, ya no necesitamos continuar
      }

      // Si el token no ha expirado, entonces continuamos el flujo normal
      setErrorMessage("");  // Limpiamos cualquier mensaje de error

    } catch (error) {
      // Si el token no se puede decodificar o tiene problemas de formato
      setErrorMessage("Token inválido. Por favor, intentalo de nuevo.");
    }
  }, [token]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Aquí llamarías a tu acción de restablecer la contraseña
      // await actions.resetPassword(password, confirmPassword, token);

      // Si todo está bien, redirigir al login (o manejar navegación)
      alert("Contraseña restablecida con éxito.");
      navigate("/login");  // Redirige al login después de un reset exitoso
    } catch (error) {
      setErrorMessage("Hubo un problema al restablecer la contraseña. Inténtalo de nuevo.");
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
