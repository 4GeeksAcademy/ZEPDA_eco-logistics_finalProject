import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate de React Router

export const CompanyCard = ({ company, favoritedItem = false }, onRemoveFavorite) => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState('');

    const { actions, store } = useContext(Context);
    const [isFavorite, setIsFavorite] = useState(favoritedItem);

    useEffect(() => {
        // Detecta el cambio en actions.updateUser()
        if (company.image !== null && company.image !== undefined) {
            setImageUrl(company.image.url); 
        } else {
            setImageUrl('');
        }
        // Verifica si esta empresa está en el array de favoritos
        const isFavorited = store.favoriteCompanies.some(fav => fav.id === company.id);
        setIsFavorite(isFavorited);
    }, [store.favoriteCompanies, company.id, company.image]);

    const handleAddFavorite = (company, id) => {
        if (!isFavorite) {
            // actions.addFavoriteCompany(company);
            actions.addFavorite(id, store.profile.id);

            console.log('Added to favorites');
        } else {
            // actions.removeFavoriteCompany(company);
            actions.removeFavorite(id, store.profile.id);
            console.log('Removed from favorites');

            if (onRemoveFavorite) {
                onRemoveFavorite(id); // Notifica a FavoritesPanel que debe eliminar la empresa
            }
        }
        setIsFavorite(!isFavorite);
    }

    const navigateToInfoEmpresa = () => {
        // Aquí pasamos los datos de la empresa como estado
        navigate("/info-empresa", { state: { company } });
    };
    return (
        <>
            <div className="card rounded-2 shadow">
                <div className="card-header border-0 bg-white rounded-2 rounded-bottom">
                    <img className="img-fluid rounded mx-auto d-block" src={imageUrl ? process.env.RUTA_LOGOS + `${imageUrl}` + "?raw=true" : "../zepdalogo.png"} alt={'logo: ' + imageUrl ? process.env.RUTA_LOGOS + `${imageUrl}` + "?raw=true" : "../zepdalogo.png"} style={{ height: '10vh' }} />
                </div>
                <div className="card-body bg-light pt-0 rounded-2 rounded-top rounded-top-0">
                    <div className="d-flex justify-content-between">
                        <div className="my-auto">
                            <h5 className="card-title fw-bold m-0 pt-2 text-start">{company.nombre}</h5>
                            <p className="card-text text-success fw-bold text-start">{company.direccion}</p>
                            <p className=" fw-bold text-start">{company.pais}</p>
                        </div>

                        {store.token && (
                            <div className="fs-1 rounded-pill icon-hover clickable" onClick={() => handleAddFavorite(company, company.id)}>
                                <i className={isFavorite ? "fa-solid fa-heart text-success" : "fa-regular fa-heart"} />
                            </div>
                        )}


                    </div>


                    <button className="btn btn-success rounded-pill float-start" onClick={navigateToInfoEmpresa}>info</button>
                </div>
            </div>
        </>
    )
};
