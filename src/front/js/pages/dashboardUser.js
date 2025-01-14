import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
import { UserPanel } from "../component/userPanel";
import { HiringsPanel } from "../component/hiringsPanel";
// import { CompanyCarousel } from "../component/companyCarousel";
import { useNavigate } from "react-router-dom";

export const DashboardUser = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(store.token);
        !store.token 
    }, [store.token]);
    console.log(store.profile);
    // {store?.token ? <Dashboard nombre={store.profile?.nombre} /> : navigate("/")}

    const getSectorKeys = () => {
        if (store.companies && Object.keys(store.companies).length > 0) {
            return Object.keys(store.companies);
        }
        return [];
    };

    return (
        <>
            <div className="container text-center mt-5">
                <h1 className="border-bottom border-2 text-start fw-normal fs-3">DASHBOARD</h1>
                <div className="d-flex justify-content-around">
                    <UserPanel user={store.profile} /> 
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
