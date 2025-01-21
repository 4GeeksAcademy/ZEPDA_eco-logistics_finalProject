import React, { useContext,useEffect } from "react";
import { Context } from "../store/appContext";
import { CompanyCard } from "./companyCard";

export const FavoritesPanel = () => {
    const { store, actions } = useContext(Context);


    useEffect(() => {
        actions.getFavorites();
    }, []);

    

    return (
        <>
            <div className="col-12 p-3"> 
                <h1 className="text-start fw-normal fs-5 mb-3">FAVORITOS</h1>
                <div className="container rounded-2 shadow" style={{ width: '100%' }}> 
                    <div className="row row-cols-auto">
                        {
                            store.favorites ? (
                                store.favorites.map((company, index) => (
                                    <div className="col-4 p-3" key={index}> 
                                        <CompanyCard company={company} />
                                    </div>
                                )
                            )
                        ) : (
                            <p>No tienes empresas favoritas</p>
                        )
                    }
                    </div>
            </div>
            </div>
        </>
    );
};