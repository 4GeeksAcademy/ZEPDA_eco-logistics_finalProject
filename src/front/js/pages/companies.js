import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
import { CompanyCarousel } from "../component/companyCarousel";
import { useParams } from "react-router-dom";

export const Companies = () => {
    const { store } = useContext(Context);
    const { paramId } = useParams();

    const getSectorByParam = () => {
        switch(paramId){
            case 'packaging':
                return 'Packaging';
            case 'transporte':
                return 'Transporte';
            case 'gestion-de-residuos':
                return 'Gestión de Residuos';
            default:
                console.log('El parametro recibido no es correcto.')
                return undefined;
        }
    }

    const getSectorKeys = () => {
        if (store.companies && Object.keys(store.companies).length > 0) {
            console.log(Object.keys(store.companies));
            return Object.keys(store.companies);
        }
        return [];
    };

    return (
        <>
        
        <div className="container text-center mt-5">
            <h1 className="border-bottom border-2 text-start fw-normal fs-3 mb-5">NUESTRAS EMPRESAS ASOCIADAS</h1>
            {
                store.companies && Object.keys(store.companies).length > 0 ? 
                (
                    (getSectorByParam() !== undefined) ?
                    (
                        <div key={Date.now()} className="p-3">
                            <CompanyCarousel sector={getSectorByParam()} isGrid={true} />
                        </div>
                    )
                    :
                    (
                        getSectorKeys().map((sector, index) => ( 
                            <div key={index} className="p-3">
                                <CompanyCarousel sector={sector} isGrid={false} />
                            </div>
                        ))
                    )
                ) 
                : 
                (
                    <p>No se encontraron empresas...</p>
                )
            }
        </div>
        </>
    );
};
