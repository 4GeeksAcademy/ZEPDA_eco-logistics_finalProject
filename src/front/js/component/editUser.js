import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";

export const EditUser = ({ show, closeModal }) => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState({
        id: store.profile.id,
        nombre: store.profile.nombre,
        email: store.profile.email,
        direccion: store.profile.direccion,
        descripcion: store.profile.descripcion
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSave = () => {
        // Lógica para guardar los cambios del usuario
        console.log('User saved:', userData);
        actions.updateUser(userData.id, userData); // Asumiendo que tienes una acción para actualizar al usuario
        
        // Cerramos el modal después de guardar los cambios
        // setShowModal(false);
        closeModal();
    };

    const handleCancel = () => {
        // Cerramos el modal sin guardar cambios
        closeModal();
        // setShowModal(false);
        // console.log(showModal);
    };

    return (
        <>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar perfil de usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={userData.nombre}
                                onChange={handleChange}
                                placeholder="Introduce tu nombre"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Introduce tu email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDireccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={userData.direccion}
                                onChange={handleChange}
                                placeholder="Introduce tu dirección"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="descripcion"
                                value={userData.descripcion}
                                onChange={handleChange}
                                placeholder="Introduce una descripción"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleSave}>Guardar y cerrar</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
