import React, { useState } from "react";
import imagenRegistro from "../../img/zepda-web-img/registro_empresa.webp";




export const RegistroEmpresa = () => {
    const [mensaje, setMensaje] = useState(""); 
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const formData = new FormData(e.target); 

        try {
            const response = await fetch(
                "https://literate-dollop-4jgv7x4xxj5v2qgrw-3001.app.github.dev/api/register-company",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                const data = await response.json();
                setMensaje("Empresa registrada exitosamente.");
                e.target.reset();
            } else {
                const error = await response.json();
                setMensaje(`Error: ${error.error}`);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setMensaje("Error al enviar el formulario. Por favor, intenta nuevamente.");
        }
    };

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <img
                        className="imagen-registro-empresa"
                        src={imagenRegistro}
                        alt="registro de empresa"
                    />
                </div>

                <div className="container mt-4">
                    <div className="text-center mb-5">
                        <p className="mt-2 col-12">
                            Formar parte de nuestra plataforma te permitirá ofrecer tus servicios a
                            empresas que buscan soluciones sostenibles para sus actividades.
                        </p>
                        <p className="col-12">
                            Rellena el siguiente formulario y envíanos tus datos para que podamos
                            añadirte a nuestra base de datos de empresas colaboradoras.
                        </p>
                    </div>

                    {/* Mensaje de éxito o error */}
                    {mensaje && (
                        <div
                            className={`alert ${
                                mensaje.includes("Error") ? "alert-danger" : "alert-success"
                            }`}
                        >
                            {mensaje}
                        </div>
                    )}

                    <form
                        className="container mt-4 col-12 col-md-8 card shadow"
                        onSubmit={handleSubmit}
                    >
                        <h4 className="mt-2 text-center">FORMULARIO DE REGISTRO</h4>
                        <input
                            type="text"
                            name="nombre"
                            className="form-control mt-3"
                            placeholder="Nombre de la Empresa"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control mt-3"
                            placeholder="Correo Electrónico"
                            required
                        />
                        <input
                            type="text"
                            name="direccion"
                            className="form-control mt-3"
                            placeholder="Dirección"
                            required
                        />
                        <input
                            type="text"
                            name="pais"
                            className="form-control mt-3"
                            placeholder="País"
                            required
                        />
                        <input
                            type="text"
                            name="telefono"
                            className="form-control mt-3"
                            placeholder="Teléfono"
                            required
                        />
                        <input
                            type="text"
                            name="cif"
                            className="form-control mt-3"
                            placeholder="CIF"
                        />
                        <input
                            type="text"
                            name="web"
                            className="form-control mt-3"
                            placeholder="Sitio Web"
                            required
                        />
                        <select
                            className="form-control mt-3"
                            name="sector"
                            id="sector-select"
                            required
                        >
                            <option value="">Selecciona tu sector</option>
                            <option value="packaging">Packaging</option>
                            <option value="transporte">Transporte</option>
                            <option value="residuos">Gestión de residuos</option>
                        </select>

                        <label htmlFor="logo" className="form-label mt-3">
                            Logotipo
                        </label>
                        <input
                            type="file"
                            className="form-control mt-3"
                            id="logo"
                            name="logo"
                            accept="image/png, image/jpeg"
                        />
                        <textarea
                            className="form-control mt-3"
                            name="descripcion"
                            rows="5"
                            placeholder="Describe detalladamente las funciones de tu empresa"
                        ></textarea>
                        <button type="submit" className="btn btn-primary m-3">
                            Enviar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};