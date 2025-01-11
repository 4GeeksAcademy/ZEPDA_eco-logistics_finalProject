import React, { useContext } from "react";

export const DashboardUser = () => {
    const { store, actions } = useContext(Context);
    

    return (
        <>

        <div className="favoritos">
            <h2>Mis empresas favoritas</h2>
            <div className="container">
                <div className="row">
                    {store.companies && Object.entries(store.companies).map(([key, value]) => {
                        return (
                            <div className="col-3" key={key}>
                                <div className="card">
                                    <img src={value.img} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{key}</h5>
                                        <p className="card-text">{value.description}</p>
                                        <a href={value.website} className="btn btn-primary">Ir a la página</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

        </div>
        </div>
        </>
    )
}