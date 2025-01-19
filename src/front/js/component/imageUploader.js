import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";

export const ImageUploader = () => {
    const { actions } = useContext(Context);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (file) {
            try {
                const response = await actions.uploadImage(file);
                setImageUrl(response.secure_url); // Muestra la URL de la imagen subida
                alert('¡Imagen subida exitosamente!');
            } catch (error) {
                alert('Error subiendo la imagen.');
            }
        }
    };

    return (
        <div className='row'>
            <div className='col-9'>
                <form onSubmit={handleUpload}>
                    <input className="form-control form-control-sm mb-3" id="formFileSm" type="file" onChange={handleFileChange} />
                    <button type="submit" className="form-control form-control-sm float-end mb-3" style={{ width: '30%' }} disabled={!file}>Subir Imagen</button>
                </form>
            </div>
            <div className='col-3'>
                <div className="imgcontainer rounded-circle border border-2 shadow-sm" style={{ height: '100px', width: '100px' }}> 
                    {imageUrl ? (                    
                        <img className="imgservicios" src={imageUrl} alt="Imagen" />   
                    ) : (
                        <img className="imgservicios" src="rigo-baby.jpg" alt="Imagen" />   
                    )}
                </div> 
            </div>            
        </div>
    );
};
