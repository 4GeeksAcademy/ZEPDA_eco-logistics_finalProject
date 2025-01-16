import React from "react";
import imagenRegistro from "../../img/zepda-web-img/registro_empresa.webp";

export const RegistroEmpresa = () => {

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

                    <form className="container mt-4 col-12 col-md-8 card shadow">
                    <h4 className="mt-2 text-center">
                            FORMULARIO DE REGISTRO
                        </h4>
                        <input type="text" className="form-control mt-3" placeholder="Nombre de la Empresa" />
                        <input type="email" className="form-control mt-3" placeholder="Correo Electrónico" />
                        <input type="text" className="form-control mt-3" placeholder="Dirección" />
                        <input type="text" className="form-control mt-3" placeholder="País" />
                        <input type="text" className="form-control mt-3" placeholder="Teléfono" />
                        <input type="text" className="form-control mt-3" placeholder="CIF" />
                        <input type="text" className="form-control mt-3" placeholder="Sitio Web" />
                        <select className="form-control mt-3" name="sector" id="sector-select">
                            <option value="">Selecciona tu sector</option>
                            <option value="packaging">Packaging</option>
                            <option value="transporte">Transporte</option>
                            <option value="residuos">Gestión de residuos</option>
                        </select>

                        <label for="logo" className="form-label mt-3">Logotipo</label>
                        <input type="file" className="form-control mt-3" id="logo" name="logo" accept="image/png, image/jpeg" placeholder="Imagen logotipo" />
                        <textarea class="form-control mt-3" id="exampleFormControlTextarea1" rows="5" placeholder="Describe detalladamente las funciones de tu empresa"></textarea>
                        <button className="btn m-3">Enviar</button>
                    </form>


                </div>

            </div>
        </>
    )
}