import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
// import { CompanyCarousel } from "../component/companyCarousel";

export const DashboardUser = () => {
    const { store } = useContext(Context);

    const getSectorKeys = () => {
        if (store.companies && Object.keys(store.companies).length > 0) {
            return Object.keys(store.companies);
        }
        return [];
    };

    return (
        <>
        
        <h1 className="border-bottom border-2 text-start fw-normal fs-3">DASHBOARD USER</h1>
        {/* <div className="container text-center mt-5">
            <h1 className="border-bottom border-2 text-start fw-normal fs-3">NUESTRAS EMPRESAS ASOCIADAS</h1>
            {
                store.companies && Object.keys(store.companies).length > 0 ? 
                (
                    getSectorKeys().map((sector, index) => ( 
                        <div key={index} className="mt-5">
                            <CompanyCarousel sector={sector} />
                        </div>
                    ))
                ) 
                : 
                (
                    <p>No se encontraron empresas...</p>
                )
            }
        </div> */}
        </>
    );
};
