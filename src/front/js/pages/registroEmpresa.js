import React, { useState, useContext } from "react";
import imagenRegistro from "../../img/zepda-web-img/registro_empresa.webp";
import { Context } from '../store/appContext';

export const RegistroEmpresa = () => {
    const {actions} = useContext(Context);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        direccion: "",
        pais: "",
        telefono: "",
        cif: "",
        web: "",
        sector: "",
        descripcion: "",
        imagen: ""
    });

    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
   

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                ...formData,
                imagen: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        actions.registrarCompany(formData);
        // Reset form
        setFormData({
            nombre: "",
            email: "",
            direccion: "",
            pais: "",
            telefono: "",
            cif: "",
            web: "",
            sector: "",
            descripcion: "",
        });
    };

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <img className="imagen-registro-empresa" src={imagenRegistro} alt="logo de Naitec" />
                </div>

                <div className="container mt-4">
                    <div className="text-center mb-5 ">
                        <p className="mt-2 col-12">
                            Formar parte de nuestra plataforma te permitirá ofrecer tus servicios a empresas que buscan soluciones sostenibles para sus actividades.
                        </p>
                        <p className="col-12">
                            Rellena el siguiente formulario y envíanos tus datos para que podamos añadirte a nuestra base de datos de empresas colaboradoras.
                            </p>   

                    </div>

                    {successMessage && ( // Muestra el mensaje de éxito si existe
                        <div className="alert alert-success text-center" role="alert">
                            {successMessage}
                        </div>
                    )}

                    <form className="container mt-4 col-12 col-md-8 card shadow" onSubmit={handleSubmit}>
                        <h4 className="mt-2 text-center">FORMULARIO DE REGISTRO</h4>
                        <input type="text" className="form-control mt-3" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre de la Empresa" required />
                        <input type="email" className="form-control mt-3" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required />
                        <input type="text" className="form-control mt-3" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" required />
                        <input type="text" className="form-control mt-3" name="pais" value={formData.pais} onChange={handleChange} placeholder="País" required />
                        <input type="text" className="form-control mt-3" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" required />
                        <input type="text" className="form-control mt-3" name="cif" value={formData.cif} onChange={handleChange} placeholder="CIF" required />
                        <input type="text" className="form-control mt-3" name="web" value={formData.web} onChange={handleChange} placeholder="Sitio Web" required />
                        <select className="form-control mt-3" name="sector" value={formData.sector} onChange={handleChange} required>
                            <option value="">Selecciona tu sector</option>
                            <option value="Packaging">Packaging</option>
                            <option value="Transportes">Transporte</option>
                            <option value="Gestión de Residuos">Gestión de residuos</option>
                        </select>
                        <label htmlFor="logo" className="form-label mt-3">Logotipo</label>
                        <input type="file" className="form-control mt-3" id="logo" name="logo" accept="image/png, image/jpeg" onChange={handleFileChange} />
                        <textarea className="form-control mt-3" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="5" placeholder="Describe detalladamente las funciones de tu empresa" required></textarea>
                        <button type="submit" className="btn btn-success m-3">Enviar</button>
                    </form>
                </div>
            </div>
        </>
    );
};