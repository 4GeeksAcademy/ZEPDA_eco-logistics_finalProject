import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import emailjs from "emailjs-com"; // Importa emailjs

export const HiringContration = ({ handleClose, company }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Nueva variable para mensajes de error

    const service_id = process.env.EMAILJS_SERVICE_ID;
    const user_id = process.env.EMAILJS_USER_ID;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que el correo de la empresa esté disponible y correctamente formateado
        if (!company.email || !/\S+@\S+\.\S+/.test(company.email)) {
            setErrorMessage("La dirección de correo de la empresa no es válida.");
            return;
        }

        // Validar el correo del remitente
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        // Preparar los parámetros para enviar el correo
        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: company.nombre,
            to_email: company.email,
            message: message,
        };

        // Enviar el correo utilizando emailjs
        emailjs
            .send(service_id, "template_h5b5bie", templateParams, user_id)
            .then(
                (response) => {
                    console.log("Email sent successfully", response.status, response.text);
                    setSuccessMessage("Hemos enviado un correo al servicio que ha solicitado");
                    setErrorMessage("");
                },
                (error) => {
                    console.error("Error sending email:", error);
                    setErrorMessage("Hubo un error al enviar el correo. Inténtelo de nuevo más tarde.");
                    setSuccessMessage("");
                }
            );

        // Limpiar los mensajes después de un tiempo
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage(""); 
            handleClose();
        }, 3000);
    };

    return (
        <>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
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
                <Button variant="btn" type="submit" className="mt-3">
                    Enviar
                </Button>
            </Form>
        </>
    );
};
