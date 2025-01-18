import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { DeletePopUp } from "./deletePopUp";
import { UploadImage } from "./uploadImage";

export const EditUser = ({ show, openModal, closeModal }) => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState({
        id: store.profile.id,
        nombre: store.profile.nombre,
        email: store.profile.email,
        direccion: store.profile.direccion || undefined,
        descripcion: store.profile.descripcion || undefined
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
        actions.updateUser(userData.id, userData); 
        
        // Cerramos el modal después de guardar los cambios
        closeModal();
    };

    const handleCancel = () => {
        // Cerramos el modal sin guardar cambios
        closeModal();
    };

    // Ventanita emergente de confirmación => FEEDBACK 
    const handleDeleteClick = () => { 
        setShowPopup(true); 
        closeModal();
    } 
    const handleDeleteCancel = () => { 
        setShowPopup(false); 
        openModal();
    }

    const handleDeleteConfirmation = () => {
        // Lógica para guardar los cambios del usuario
        console.log('User deleted: ', userData);
        const check = actions.deleteUser(userData.id); 

        if (check) {
            // Cerramos el modal después de guardar los cambios
            setShowPopup(false); 
            navigate("/"); // Redirigir a la página principal o de login
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar perfil de usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <UploadImage />
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
                <Modal.Footer className="justify-content-between">
                    <a href="#" className="text-danger float-start" onClick={(e) => { e.preventDefault(); handleDeleteClick(); }}>
                        Eliminar usuario
                    </a>
                    <div>
                        <Button variant="success" onClick={handleSave}>Guardar y cerrar</Button>
                        <Button className="ms-2" variant="secondary" onClick={handleCancel}>Cancelar</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <DeletePopUp
                show={showPopup} 
                userId={userData.id} 
                onDelete={handleDeleteConfirmation} 
                onCancel={handleDeleteCancel} 
            />  
        </>
    );
};
