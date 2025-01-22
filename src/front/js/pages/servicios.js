import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imgpackaging from "../../img/zepda-web-img/packaging-sostenible.webp"
import imgtransporte from "../../img/zepda-web-img/furgonetas-w.webp"
import imgresiduos from "../../img/1533057826357.jpeg"
import { Link } from "react-router-dom";

export const Servicios = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <div className="container mt-4">
            <h1>Servicios</h1>

            <div className="contservicios">
            <div className="servicios d-flex mt-5">
                <div className="imgcontainer me-4">
                    <img className="imgservicios" src={imgpackaging} alt="packaging" />

                </div>
                <div className="txtpackaging">
                    <h5 className="">PACKAGING</h5>
                    <p>Nuestras empresas ofrecen soluciones de embalaje sostenible para empresas que buscan reducir su huella de carbono.</p>
                    <p>Desde embalajes biodegradables hasta embalajes reutilizables, nuestros socios ofrecen una amplia gama de soluciones de embalaje sostenible.</p>
                    <p>Si buscas una solución de embalaje sostenible, no dudes en contactar con nosotros.</p>
                    
                </div>
                
                </div>
                <Link to="/companies/packaging"><button className="btn mb-2">Empresas</button></Link>
                

            </div>




            <div className="contservicios">
            <div className="servicios d-flex mt-5">
                <div className="imgcontainer me-4">
                <img className="imgservicios " src={imgtransporte} alt="packaging" />
                </div>
                <div className="txttransporte">
                    <h5 className="">TRANSPORTE</h5>
                    <p>Nuestras empresas ofrecen soluciones de transporte sostenible para empresas que buscan reducir su huella de carbono.</p>
                    <p>Desde transporte marítimo, por avión hasta transporte terrestre, nuestros socios ofrecen una amplia gama de soluciones de transporte sostenible.</p>
                    <p>Si buscas una solución de transporte sostenible, no dudes en contactar con nosotros.</p>
                </div>
                
                </div>
                <Link to="/companies/transporte"><button className="btn mb-2">Empresas</button></Link>
                

            </div>





            <div className="contservicios">
            <div className="servicios d-flex mt-5">
                <div className="imgcontainer me-4">
                <img className="imgservicios " src={imgresiduos} alt="packaging" />
                </div>
                <div className="txttransporte">
                    <h5 className="">GESTION DE RESIDUOS</h5>
                    <p>Nuestras empresas ofrecen soluciones de gestion de residuos sostenible para empresas que buscan reducir su huella de carbono.</p>
                    <p>Desde reciclaje de papel hasta reciclaje de plástico, nuestros socios ofrecen una amplia gama de soluciones de gestion de residuos sostenible.</p>
                    <p>Si buscas una solución de gestion de residuos sostenible, no dudes en contactar con nosotros.</p>
                    
                </div>
                
                </div>
                <Link to="/companies/gestion-de-residuos"><button className="btn mb-2">Empresas</button></Link>
                

            </div>







            
            
            

        </div>
        </>
    )
}