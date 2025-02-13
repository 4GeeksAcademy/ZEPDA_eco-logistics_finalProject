import React, { useRef, useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Context } from "../../store/appContext";

export const ImageUploader = forwardRef(({ type, backUpImage = null}, ref) => {
    const { actions } = useContext(Context);
    const [file, setFile] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);
    const fileInputRef = useRef(null);

    // Datos de la imagen
    const [updateImage, setUpdateImage] = useState(false);
    const [imageData, setImageData] = useState({ 
        imageID: '', 
        publicID: '', 
        imageURL: ''
    });

    useImperativeHandle(ref, () => ({
        clearImage,
        handleUploadImage,
        setInitialImage
    }));

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
            await actions.deleteImage(imageData.publicID);
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
                setImageData({
                    imageID: response.id,
                    publicID: response.public_id,
                    imageURL: response.url
                });
                console.log(response);
                setFile(null);
                setUpdateImage(true);
                setFileUploaded(true); // Se ha subido una imagen al servidor
                // alert('¡Imagen subida exitosamente!');
            } catch (error) {
                alert('Error subiendo la imagen.');
            }
        }
    };

    const clearImage = () => {
        if (fileUploaded) {
            // resetImage();
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
        setImageData({
            imageID: '',
            publicID: '',
            imageURL: ''
        });
        setUpdateImage(false);
    }

    const handleTrashImage = async (e) => {
        if (fileUploaded) {
            resetImage();
        }
        clearImage(); // Limpia el input 
        setUpdateImage(true); // Borra la imagen
    };

    // Consecuencia final de la actualización de imagen
    const handleUploadImage = async (saveImage, modelID) => {
        // Si ha modificado la image: sube una nueva o borra la actual
        console.log('Revisando imagen...', updateImage);
        if (updateImage) {
            console.log('¡Actualizando imagen!', saveImage);
            // Si presiona en 'Guardar y salir'
            if (saveImage) {
                console.log('asociando imagen', imageData.imageID || null,' a ', type, ': ', modelID || null);
                await actions.associateImage(type, modelID, imageData.imageID);
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

    const setInitialImage = () => {
        // Valores de imagen previa si existen:
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

    useEffect(() => {
        // Control para el refresco de ventana:
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
                <p className="text-start mb-2">Imagen de {type.toUpperCase()}</p> 
                <form onSubmit={handleUpload}>
                    <input className="form-control form-control-sm mb-3" ref={fileInputRef} type="file" onChange={handleFileChange} />
                    <div className="float-end mb-2">
                        {file &&
                            <Button type="submit" variant="success" disabled={!file} className='px-3 py-1 m-0 fs-6'>Subir Imagen</Button>
                        }
                        {imageData.imageURL &&
                            <OverlayTrigger
                                overlay={
                                    <Tooltip id="button-tooltip">
                                        Eliminar imagen de usuario
                                    </Tooltip>
                                }
                            >
                                <Button variant="danger" disabled={!imageData.imageURL} className='px-3 py-1 ms-2' onClick={handleTrashImage}><i className="fa-solid fa-trash fs-6 p-0"></i></Button>
                            </OverlayTrigger>
                        }
                    </div>
                </form>
            </div>
            <div className='col-3 mb-3'>
                <div className="imgcontainer rounded-circle border border-2 shadow-sm mt-2" style={{ height: '100px', width: '100px' }}>
                    <img className="imgservicios" src={imageData.imageURL || "rigo-baby.jpg"} alt="Imagen" />
                </div>
            </div>
        </div>
    );
});
