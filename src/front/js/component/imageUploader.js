import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";

export const ImageUploader = () => {
    const { actions } = useContext(Context);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
        <div>
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Subir Imagen</button>
        </form>
        {imageUrl && <img src={imageUrl} alt="Imagen subida" />}
        </div>
    );
};
