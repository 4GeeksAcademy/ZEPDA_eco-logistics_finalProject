import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const ForgotPasswordModal = ({ show, onHide, onPasswordReset }) => {
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState(""); // Mensaje de éxito o error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setResetMessage("Por favor, ingresa tu correo electrónico.");
      return;
    }

    setIsLoading(true);
    setResetMessage(""); // Limpiar el mensaje anterior
    setErrorMessage(""); // Limpiar el mensaje de error anterior

    try {
      const result = await onPasswordReset(email);
      setIsLoading(false);

      if (result.success) {
        setResetMessage("Te hemos enviado un correo para restablecer la contraseña.");
        setEmail(""); // Limpiar el campo de email
        setTimeout(() => {
          onHide(); // Cerrar la modal después de 2 segundos
        }, 2000);
      } else {
        setErrorMessage(result.message || "No se ha podido enviar el correo. Intenta nuevamente.");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Hubo un problema al intentar enviar el correo. Intenta nuevamente.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Recuperación de contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="mb-3">
            <label htmlFor="forgotPasswordEmail" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              id="forgotPasswordEmail"
              placeholder="Ingresa tu correo para recuperar la contraseña"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button variant="secondary" type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar correo de recuperación"}
          </Button>
        </form>

        {/* Mostrar el mensaje de éxito */}
        {resetMessage && (
          <div
            className={`alert ${resetMessage.includes("error") ? "alert-danger" : "alert-success"} mt-3`}
          >
            {resetMessage}
          </div>
        )}

        {/* Mostrar mensaje de error si existe */}
        {errorMessage && (
          <div className="alert alert-danger mt-3">
            {errorMessage}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

