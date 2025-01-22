import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { DeletePopUp } from "./deletePopUp";
import { ImageUploader } from "./cloudinary/imageUploader";

export const EditUser = ({ show, openModal, closeModal, backUpImage }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [updateImage, setUpdateImage] = useState(false);
    // Datos de la imagen
    const [imageData, setImageData] = useState({ 
        imageID: '', 
        publicID: '', 
        imageURL: ''
    });
    // Datos del usuario
    const [userData, setUserData] = useState({
        id: store.profile.id,
        nombre: store.profile.nombre,
        email: store.profile.email,
        direccion: store.profile.direccion || undefined,
        descripcion: store.profile.descripcion || undefined
    });

    useEffect(() => {
        if(show){
            // console.log(backUpImage, show);
            if (backUpImage !== null) {
                setImageData({ 
                    imageID: backUpImage.id, 
                    publicID: backUpImage.public_id, 
                    imageURL: backUpImage.url
                });
            } else {
                setImageData({ 
                    imageID: '', 
                    publicID: '', 
                    imageURL: ''
                });
            }
        }
    }, [show])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSave = async () => {
        // Lógica para guardar los cambios del usuario
        await handleUploadImage(true);
        actions.updateUser(userData.id, userData);

        // Cerramos el modal después de guardar los cambios
        closeModal();
    };

    const handleCancel = async () => {
        // Cerramos el modal sin guardar cambios
        await handleUploadImage(false);
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

        const check = actions.deleteUser(userData.id); // borra al usuario

        if (check) {
            // Cerramos el modal después de guardar los cambios
            setShowPopup(false);
            navigate("/"); // Redirigir a la página principal o de login
        }
    };

    // Consecuencia final de la actualización de imagen
    const handleUploadImage = async (saveImage) => {
        // Si ha modificado la image: sube una nueva o borra la actual
        console.log('Revisando imagen...', updateImage);
        if (updateImage) {
            console.log('¡Actualizando imagen!', saveImage);
            // Si presiona en 'Guardar y salir'
            if (saveImage) {
                console.log('asociando imagen al usuario', imageData.imageID || null);
                await actions.associateImage('user', userData.id, imageData.imageID);
            }
            // Si presiona en 'Cancelar'
            else {
                if (imageData.publicID) {
                    console.log('borrando imagen descartada', imageData.publicID);
                    await actions.deleteImage(imageData.publicID);
                } 
            }
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar perfil de usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ImageUploader type="user" id={userData.id} handleUpdate={setUpdateImage} setImage={setImageData} image={imageData} />
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
