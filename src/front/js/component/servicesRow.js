import React from "react";
import { Link } from "react-router-dom";

export const ServicesRow = () => {

    return (
        <>
            <div className="d-flex justify-content-around"> 
                <div className="d-flex flex-wrap">

                <div className="col-12 col-md-4 p-3">
                    <h1 className="text-start fw-normal fs-5 mb-3">PACKAGING</h1>
                    <Link to={"/companies/packaging"}>
                        <div className="imgcontainer border border-2" style={{height:'25vh', width: '100%'}}> 
                            <img className="imgservicios" src="packaging-sostenible.webp" alt="img-packaging" />
                        </div> 
                    </Link>
                </div>
                <div className="col-12 col-md-4 p-3">
                    <h1 className="text-start fw-normal fs-5 mb-3">TRANSPORTE</h1>
                    <Link to={"/companies/transporte"}>
                        <div className="imgcontainer border border-2" style={{height:'25vh', width: '100%'}}> 
                            <img className="imgservicios" src="furgonetas-w.webp" alt="img-transporte" />
                        </div> 
                    </Link>
                </div>
                <div className="col-12 col-md-4 p-3">
                    <h1 className="text-start fw-normal fs-5 mb-3">GESTIÓN DE RESIDUOS</h1>
                    <Link to={"/companies/gestion-de-residuos"}>
                        <div className="imgcontainer border border-2" style={{height:'25vh', width: '100%'}}> 
                            <img className="imgservicios" src="1533057826357.jpeg" alt="img-gestion-residuos" />
                        </div> 
                    </Link>
                </div>
                </div>
            </div>
        </>
    )
};
