import React, { useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Context } from "../store/appContext";

export const HiringContration = ({ handleClose, company}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
console.log(company)
    const { actions, store } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Llamar a la acción addHiring desde el flux
            const isAdded = await actions.addHiring(company.id, store.profile.id);
            if (isAdded) {
                setSuccess("Hemos enviado un correo al servicio que ha solicitado");
                setTimeout(() => {
                    setSuccess("");
                    handleClose(); // Cerrar el modal después de mostrar el mensaje de éxito
                }, 2000);
            } else {
                setError("Error al realizar la contratación, intente nuevamente.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Hubo un problema al procesar su solicitud.");
        }
    };

    

    return (
        <>
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formMessage">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="btn" type="submit" className="mt-3" >
                    Enviar
                </Button>
            </Form>
        </>
    );
};
