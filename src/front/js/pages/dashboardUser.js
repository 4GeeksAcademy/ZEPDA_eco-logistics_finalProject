import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
import { UserPanel } from "../component/userPanel";
import { HiringsPanel } from "../component/hiringsPanel";
import { FavoritesPanel } from "../component/favoritesPanel";
import { ServicesRow } from "../component/servicesRow";

export const DashboardUser = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container text-center mt-5">
                <h1 className="border-bottom border-2 text-start fw-normal fs-3 mb-5">DASHBOARD</h1>
                <div className="d-flex justify-content-around flex-wrap">
                    <UserPanel user={store.profile} /> 
                    <HiringsPanel /> 
                </div>
                <div className="mt-3">
                    <FavoritesPanel />
                </div>
                <div className="mt-3">
                    <ServicesRow />
                </div>
            </div>
        </>
    );
};