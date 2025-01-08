import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CompanyCard } from "../component/companyCard";
import "../../styles/companies.css";

export const Companies = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <h1>Página empresas</h1>
        <div className="container text-center">
            <div className="row">
                <CompanyCard />
                <CompanyCard />
                <CompanyCard />
            </div>
        </div>
        </>
    );
};
