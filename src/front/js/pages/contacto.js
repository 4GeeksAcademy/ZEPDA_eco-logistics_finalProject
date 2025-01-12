import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import imagen from "../../img/zepda-web-img/Driving-Green-Email-Marketing-for-Eco-Friendly-Products-scaled-1-2.webp";
import emailjs from "emailjs-com";

export const Contacto = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [emailError, setEmailError] = useState("");

    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar formato de correo electrónico
        if (!emailRegex.test(email)) {
            setEmailError("Por favor, ingresa un correo electrónico válido.");
            return;
        } else {
            setEmailError("");  // Limpiar el error si el correo es válido
        }

        setSending(true);
        setSuccessMessage("");
        setErrorMessage("");

        // EmailJS send function
        const templateParams = {
            from_email: email,
            message: message,
        };

        emailjs
            .send(
                "service_h9ur4xn", // Reemplaza con tu ID de servicio
                "template_pm7flil", // Reemplaza con tu ID de plantilla
                templateParams,
                "YixCcCZjxuEJaxPej" // Reemplaza con tu ID de usuario
            )
            .then(
                (response) => {
                    setSending(false);
                    setSuccessMessage("¡Mensaje enviado exitosamente!");
                    setEmail(""); // Limpiar los campos
                    setMessage("");
                },
                (error) => {
                    setSending(false);
                    setErrorMessage("Hubo un error al enviar el mensaje. Intenta de nuevo.");
                }
            );
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
                    <h1 className="text-center mb-4">Envíanos</h1>
                    <h4 className="text-center mb-4">Tu consulta</h4>
                    <p className="text-center mb-4">
                        ¿Tienes alguna duda o necesitas información sobre nuestros servicios? Escríbenos sin compromiso y te ayudaremos a resolver tus dudas.
                    </p>

                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {emailError && <div className="alert alert-danger">{emailError}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                                Mensaje
                            </label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-dark w-100" disabled={sending}>
                                {sending ? "Enviando..." : "Enviar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};