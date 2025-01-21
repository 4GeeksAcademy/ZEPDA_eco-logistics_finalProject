import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import naiteclogo from "../../img/naitec-logo.png"


const handleAddFavorite = (company, actions, isFavorite, setIsFavorite) => {
    if (!isFavorite) {
        actions.addFavoriteCompany(company);
        console.log('Added to favorites');
    } else {
        actions.removeFavoriteCompany(company);
        console.log('Removed from favorites');
    }
    setIsFavorite(!isFavorite);
}

export const CompanyCard = ({company}) => {
    const navigateToQuienesSomos = () => {
        window.location.href = "/info-empresa";
    };

    const { actions } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <>
            <div className="card rounded-2 shadow"> 
                <div className="card-header border-0 bg-white rounded-2 rounded-bottom"> 
                    <img className="img-fluid object-fit-contain rounded mx-auto d-block" src={process.env.RUTA_LOGOS + `${company.imagen_url}`+ "?raw=true"} alt={'logo: ' + process.env.RUTA_LOGOS + company.imagen_url} style={{height:'10vh'}} /> 
                </div> 
                <div className="card-body bg-light pt-0 rounded-2 rounded-top rounded-top-0"> 
                    <div className="d-flex justify-content-between">
                        <div className="my-auto">
                            <h5 className="card-title fw-bold m-0 pt-2 text-start">{company.nombre}</h5> 
                            <p className="card-text text-success fw-bold text-start">{company.direccion}</p> 
                            <p className=" fw-bold text-start">{company.pais}</p> 
                        </div>
                        <div className="fs-1 rounded-pill icon-hover clickable" onClick={() => handleAddFavorite(company, actions, isFavorite, setIsFavorite)}>
                            <i className={isFavorite ? "fa-solid fa-heart text-success" : "fa-regular fa-heart"} />
                        </div>
                    </div>

                    
                    <button className="btn btn-success rounded-pill float-start" onClick={navigateToQuienesSomos}>info</button>
                </div> 
            </div> 
        </>
    )
};