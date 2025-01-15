import React from "react";
import naiteclogo from "../../img/naitec-logo.png"

export const CompanyCard = ({company}) => {
    return (
        <>
            <div className="col-4 p-3"> 
                <div className="card rounded-5"> 
                    <div className="card-header border-0 bg-white rounded-5 rounded-bottom"> 
                        <img className="img-fluid rounded mx-auto d-block" src={company.logo} alt={'logo: ' + company.logo} style={{height:'30vh'}} /> 
                    </div> 
                    <div className="card-body bg-light pt-0 rounded-5 rounded-top rounded-top-0"> 
                        <div className="d-flex justify-content-between">
                            <div className="my-auto">
                                <h5 className="card-title fw-bold m-0 pt-2 text-start">{company.nombre}</h5> 
                                <p className="card-text text-success fw-bold text-start">{company.pais}</p> 
                            </div>
                            <div className="fs-1 rounded-pill icon-hover clickable" /*onClick={handleAddFavorite}*/>
                                <i className="fa-regular fa-heart" />
                            </div>
                        </div>

                        <p className="card-text text-secondary text-start">Grown in {company.ubicacion}</p> 
                        <a href="#" className="btn btn-success rounded-pill float-start">info</a> 
                    </div> 
                </div> 
            </div>
        </>
    )
};