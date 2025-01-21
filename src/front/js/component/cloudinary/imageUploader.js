import React, { useRef, useEffect, useState, useContext } from 'react';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Context } from "../../store/appContext";

export const ImageUploader = ({ type, id, handleUpdate, setImage, image = null }) => {
    const { actions } = useContext(Context);
    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log(`Tamaño del archivo: ${selectedFile.size} bytes`);
            // console.log(selectedFile);
        }
        setFile(selectedFile);
    };

    const resetImage = async () => {
        try {
            await actions.deleteImage(image.publicID);
        } catch (error) {
            alert('Error borrando la imagen anterior.');
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (file) {
            console.log('subiendo imagen');
            if (fileUploaded) {
                resetImage();
            }
            try {
                const response = await actions.uploadImage(file, type);
                setImage({
                    imageID: response.id,
                    publicID: response.public_id,
                    imageURL: response.url
                });
                console.log(response);
                setFile(null);
                handleUpdate(true);
                setFileUploaded(true); // Se ha subido una imagen al servidor
                // alert('¡Imagen subida exitosamente!');
            } catch (error) {
                alert('Error subiendo la imagen.');
            }
        }
    };

    const handleTrashImage = async (e) => {
        if (fileUploaded) {
            resetImage();
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
        setImage({
            imageID: '',
            publicID: '',
            imageURL: ''
        });
        handleUpdate(true);
    };

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            handleTrashImage();  // Llama a tu método de limpieza
            event.returnValue = '';
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [fileUploaded]);

    return (
        <div className='row'>
            <div className='col-9'>
                <form onSubmit={handleUpload}>
                    <input className="form-control form-control-sm mb-3" ref={fileInputRef} type="file" onChange={handleFileChange} />
                    <div className="float-end mb-3">
                        {file &&
                            <Button type="submit" variant="success" disabled={!file} className='px-3 py-1 m-0 fs-6'>Subir Imagen</Button>
                        }
                        {image.imageURL &&
                            <OverlayTrigger
                                overlay={
                                    <Tooltip id="button-tooltip">
                                        Eliminar imagen de usuario
                                    </Tooltip>
                                }
                            >
                                <Button variant="danger" disabled={!image.imageURL} className='px-3 py-1 ms-2' onClick={handleTrashImage}><i className="fa-solid fa-trash fs-6 p-0"></i></Button>
                            </OverlayTrigger>
                        }
                    </div>
                </form>
            </div>
            <div className='col-3'>
                <div className="imgcontainer rounded-circle border border-2 shadow-sm" style={{ height: '100px', width: '100px' }}>
                    <img className="imgservicios" src={image.imageURL || "rigo-baby.jpg"} alt="Imagen" />
                </div>
            </div>
        </div>
    );
};
