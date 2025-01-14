import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
import { UserPanel } from "../component/userPanel";
import { HiringsPanel } from "../component/hiringsPanel";
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
            <div className="container text-center mt-5">
            <h1 className="border-bottom border-2 text-start fw-normal fs-3">DASHBOARD USER</h1>
                <div className="d-flex justify-content-around">
                    <UserPanel />
                    <HiringsPanel />    
                </div>
                {/* {
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
                } */}
            </div>
        </>
    );
};
