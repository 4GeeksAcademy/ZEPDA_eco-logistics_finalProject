import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
import { UserPanel } from "../component/userPanel";
import { HiringsPanel } from "../component/hiringsPanel";
import { FavoritesPanel } from "../component/favoritesPanel";

export const DashboardUser = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log(store.profile);
        console.log(store.token);
        actions.saveUserData(store.profile, store.token);
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
            </div>
            <div className="container text-center mt-5 border-2 rounded">
                <FavoritesPanel />
            </div>
        </>
    );
};
