import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
import { CompanyCarousel } from "../component/companyCarousel";

export const Companies = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        
        <div className="container text-center mt-5">
            <h1 className="border-bottom border-2 text-start fw-normal fs-3">NUESTRAS EMPRESAS ASOCIADAS</h1>
            <div className="mt-5">
                <h1 className="text-start fw-normal fs-5 mb-0">EMPRESAS DE PACKAGING</h1>
                <CompanyCarousel />
            </div>
            <div className="mt-5">
                <h1 className="text-start fw-normal fs-5 mb-0">EMPRESAS DE TRANSPORTES</h1>
                <CompanyCarousel />
            </div>
            <div className="mt-5">
                <h1 className="text-start fw-normal fs-5 mb-0">EMPRESAS DE GESTIÓN DE RESIDUOS</h1>
                <CompanyCarousel />
            </div>
        </div>
        </>
    );
};
