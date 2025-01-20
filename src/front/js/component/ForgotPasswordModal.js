import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const ForgotPasswordModal = ({ show, onHide, onPasswordReset }) => {
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState(""); // Mensaje de éxito o error
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setResetMessage("Por favor, ingresa tu correo electrónico.");
      return;
    }

    setIsLoading(true);
    const result = await onPasswordReset(email);
    setIsLoading(false);

    setResetMessage(result.message);
    if (result.success) {
      setEmail(""); // Limpiar el campo de correo
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
        {resetMessage && (
          <div
            className={`alert ${resetMessage.includes("error") ? "alert-danger" : "alert-success"} mt-3`}
          >
            {resetMessage}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


