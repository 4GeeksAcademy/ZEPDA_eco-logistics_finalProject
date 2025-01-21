import React, { useEffect, useState, useContext } from 'react';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Context } from "../../store/appContext";

export const ImageUploader = ({type, id, image = null}) => {
    const { actions } = useContext(Context);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageID, setImageID] = useState('');

    useEffect(() => {
        console.log(image);
        if (image !== null) {
            setImageUrl(image.url);
            setImageID(image.public_id);
        }
    }, [])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) { 
            console.log(`Tamaño del archivo: ${selectedFile.size} bytes`); 
        }
        setFile(selectedFile);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (file) {
            console.log('subiendo imagen');
            try {
                const response = await actions.uploadImage(file, type, id);
                setImageUrl(response.secure_url); 
                setImageID(response.public_id);
                setFile(null);
                // alert('¡Imagen subida exitosamente!');
            } catch (error) {
                alert('Error subiendo la imagen.');
            }
        }
    };

    const handleTrashImage = async (e) => {
        if (imageID) {
            console.log('borrando imagen');
            try {
                const response = await actions.deleteImage(imageID);
                setImageUrl(''); 
                setImageID('');
                setFile(null);
                // alert('¡Imagen eliminada exitosamente!');
            } catch (error) {
                alert('Error eliminando la imagen.');
            }
        }
    };

    return (
        <div className='row'>
            <div className='col-9'>
                <form onSubmit={handleUpload}>
                    <input className="form-control form-control-sm mb-3" id="formFileSm" type="file" onChange={handleFileChange} />
                    <div className="float-end mb-3">
                        {file &&
                            <Button type="submit" variant="success" disabled={!file} className='px-3 py-1 m-0 fs-6'>Subir Imagen</Button>
                        }
                        {imageUrl &&
                            <OverlayTrigger 
                                overlay={
                                    <Tooltip id="button-tooltip">
                                        Eliminar imagen de usuario
                                    </Tooltip>
                                }
                            >
                                <Button variant="danger" disabled={!imageUrl} className='px-3 py-1 ms-2' onClick={handleTrashImage}><i className="fa-solid fa-trash fs-6 p-0"></i></Button>
                            </OverlayTrigger>
                        }
                    </div>
                </form>
            </div>
            <div className='col-3'>
                <div className="imgcontainer rounded-circle border border-2 shadow-sm" style={{ height: '100px', width: '100px' }}>
                    <img className="imgservicios" src={imageUrl || "rigo-baby.jpg"} alt="Imagen" />
                </div>
            </div>
        </div>
    );
};
