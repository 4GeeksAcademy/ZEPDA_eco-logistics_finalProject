import React, { useEffect, useState, useContext } from 'react';
import { Button } from "react-bootstrap";
import { Context } from "../../store/appContext";

export const ImageUploader = ({type, id, url = ''}) => {
    const { actions } = useContext(Context);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (url !== '') {
            setImageUrl(url);
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
            try {
                const response = await actions.uploadImage(file, type, id);
                setImageUrl(response.secure_url); // Muestra la URL de la imagen subida
                alert('¡Imagen subida exitosamente!');
                setFile(null);
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
                    {file &&
                        <Button type="submit" className="form-control form-control-sm float-end mb-3" style={{ width: '40%' }} disabled={!file}>Subir Imagen</Button>
                    }
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
