import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CompanyCard } from "./companyCard";

export const FavoritesPanel = () => {
    const { store } = useContext(Context);

    return (
        <>
            <div className="col-12 p-3"> 
                <h1 className="text-start fw-normal fs-5 mb-3">FAVORITOS</h1>
               
            </div>
        </>
    );
};