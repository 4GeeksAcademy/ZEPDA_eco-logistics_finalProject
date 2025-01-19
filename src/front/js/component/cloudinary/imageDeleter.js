import React, { useState, useContext } from 'react';
import { Context } from "../../store/appContext";

export const ImageDeleter = () => {
    const { actions } = useContext(Context);
    const [publicId, setPublicId] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();

        if (publicId) {
        try {
            const response = await actions.deleteImage(publicId);
            alert('¡Imagen eliminada exitosamente!');
            console.log(response);
        } catch (error) {
            alert('Error eliminando la imagen.');
        }
        }
    };

    return (
        <div>
        <form onSubmit={handleDelete}>
            <input
            type="text"
            value={publicId}
            onChange={(e) => setPublicId(e.target.value)}
            placeholder="Public ID de la imagen"
            />
            <button type="submit">Eliminar Imagen</button>
        </form>
        </div>
    );
};
