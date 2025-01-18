import React, { useState } from 'react';

export const UploadImage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'add_image_zepda'); // Usa tu upload preset aquí

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/`+process.env.CLOUDINARY_NAME+`/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Imagen subida:', data.secure_url);
        alert('¡Imagen subida exitosamente!');
      } else {
        console.error('Error subiendo la imagen:', response.statusText);
        alert('Error al subir la imagen.');
      }
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
      alert('Error al subir la imagen.');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Subir Imagen</button>
      </form>
    </div>
  );
};
