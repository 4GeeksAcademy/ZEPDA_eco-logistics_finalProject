import React, { useContext } from 'react';
import { Context } from "../../store/appContext";

export const DeleteAllImages = () => {
    const { actions } = useContext(Context);
    const handleDeleteAll = async () => {
        try {
            const response = await actions.deleteAllImages();
            alert('¡Todas las imágenes han sido eliminadas!');
            console.log(response);
        } catch (error) {
            alert('Error eliminando todas las imágenes.');
        }
    };

    return (
        <div>
            <button onClick={handleDeleteAll}>Eliminar Todas las Imágenes</button>
        </div>
    );
};
