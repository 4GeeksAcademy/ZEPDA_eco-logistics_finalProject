import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CompanyCard } from "./companyCard";

export const FavoritesPanel = () => {
    const { store } = useContext(Context);

    return (
        <>
            <div className="col-12 p-3"> 
                <h1 className="text-start fw-normal fs-5 mb-3">FAVORITOS</h1>
                <div className="col-12 rounded-2 shadow d-flex flex-wrap" style={{height:'50vh', overflowY: 'auto'}}> 
                    {store.favoriteCompanies.length === 0 ? (
                        <p className="text-center w-100">No tienes favoritos</p>
                    ) : (
                        store.favoriteCompanies.map((company, index) => (
                            <CompanyCard key={index} company={company}  />
                        ))
                    )}
                </div> 
            </div>
        </>
    );
};