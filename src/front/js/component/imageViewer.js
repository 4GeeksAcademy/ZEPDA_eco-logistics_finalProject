import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";

export const ImageViewer = ({ publicId }) => {
    const { actions } = useContext(Context);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
        try {
            const url = await actions.getImageUrl(publicId);
            setImageUrl(url); // Muestra la URL de la imagen
        } catch (error) {
            alert('Error obteniendo la imagen.');
        }
        };

        fetchImage();
    }, [publicId]);

    return (
        <div>
        {imageUrl ? (
            <img src={imageUrl} alt="Imagen" />
        ) : (
            <p>Cargando imagen...</p>
        )}
        </div>
    );
};
