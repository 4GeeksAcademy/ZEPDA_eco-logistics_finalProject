import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/companies.css";
import { UserPanel } from "../component/userPanel";
import { HiringsPanel } from "../component/hiringsPanel";

export const DashboardUser = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        console.log(store.profile);
        console.log(store.token);
        actions.saveUserData(store.profile, store.token);
    }, [store.token]);

    return (
        <>
            <div className="container text-center mt-5">
                <h1 className="border-bottom border-2 text-start fw-normal fs-3">DASHBOARD</h1>
                <div className="d-flex justify-content-around">
                    <UserPanel user={store.profile} /> 
                    <HiringsPanel /> 
                </div>
            </div>
        </>
    );
};
