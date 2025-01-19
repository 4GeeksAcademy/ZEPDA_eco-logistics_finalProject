import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const DeletePopUp = ({ show, userId, onDelete, onCancel }) => {
  const [confirmationText, setConfirmationText] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmationChange = (e) => {
    setConfirmationText(e.target.value);
    setIsConfirmed(e.target.value === 'ELIMINAR');
  };

  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="bg-warning border-2 border-black">
        <Modal.Title>Advertencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Para confirmar la eliminación del usuario, por favor escribe <strong>ELIMINAR</strong> en el cuadro de texto a continuación.
        </p>
        <Form.Control
          type="text"
          value={confirmationText}
          onChange={handleConfirmationChange}
          placeholder="Escribe ELIMINAR aquí"
          className={isConfirmed ? 'is-valid' : 'is-invalid'}
        />
        {isConfirmed && <div className="valid-feedback d-block">¡Confirmación correcta!</div>}
        {!isConfirmed && confirmationText.length > 0 && <div className="invalid-feedback d-block">Texto incorrecto.</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => onDelete(userId)} disabled={!isConfirmed}>
          Aceptar
        </Button>
        <Button variant="danger" onClick={onCancel}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
