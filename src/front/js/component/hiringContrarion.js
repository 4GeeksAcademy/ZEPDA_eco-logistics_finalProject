import React, { useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Context } from "../store/appContext";
import emailjs from "emailjs-com"; // Importa emailjs

export const HiringContration = ({ handleClose, company }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const { actions, store } = useContext(Context);

    const service_id = process.env.EMAILJS_SERVICE_ID;
    const user_id = process.env.EMAILJS_USER_ID;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           
            const isAdded = await actions.addHiring(company.id, store.profile.id);
            if (isAdded) {
                setSuccess("Hemos enviado un correo al servicio que ha solicitado");

               
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    to_name: company.nombre,
                    to_email: company.email,
                    message: message,
                };

              
                emailjs
                    .send(service_id, "template_h5b5bie", templateParams, user_id)
                    .then(
                        (response) => {
                            console.log("Email sent successfully", response.status, response.text);
                            setSuccess("Correo enviado correctamente.");
                            setError("");
                        },
                        (error) => {
                            console.error("Error sending email:", error);
                            setError("Hubo un error al enviar el correo. Inténtelo de nuevo más tarde.");
                            setSuccess("");
                        }
                    );
                                   
                setTimeout(() => {
                    setSuccess("");
                    handleClose();
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
            {error && <Alert variant="danger">{error}</Alert>}
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
