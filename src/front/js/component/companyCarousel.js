import React, { useState, useContext } from "react";
import { CompanyCard } from "../component/companyCard";
import { Context } from '../store/appContext';


export const CompanyCarousel = ({sector, isGrid}) => {
    // App Store
    const { store } = useContext(Context);
    const sectorCompanies = store.companies[sector];
    console.log(sectorCompanies.length);
    // Component Logic Variables
    const [currentIndex, setCurrentIndex] = useState(0); 
    const totalItems = sectorCompanies.length - 2; // los que hay -2
    const itemsToShow = 3; 
    
    const handleMoveCarousel = (direction) => { 
        const newIndex = (currentIndex + direction + totalItems) % totalItems; 
        setCurrentIndex(newIndex); 
    }; 
    
    const getTransformStyle = () => { 
        const offset = -currentIndex * (100 / itemsToShow); 
        return { transform: `translateX(${offset}%)` }; 
    };

    const getSectorImage = (sectorId) => {
        switch(sectorId){
            case 'Packaging':
                return <img className="imgservicios" src="../packaging-sostenible.webp" alt="img-packaging" />;
            case 'Transporte':
                return <img className="imgservicios" src="../furgonetas-w.webp" alt="img-transporte" />;
            case 'Gestión de Residuos':
                return <img className="imgservicios" src="../1533057826357.jpeg" alt="img-gestion-residuos" />;
            default:
                console.log('El parametro recibido no es correcto.')
                return undefined;
        }
    }

    return (
        <>
            <h1 className="text-start fw-normal fs-5 mb-0 border-bottom">EMPRESAS DE {sector.toUpperCase()}</h1>
            {
                isGrid ? (
                    <>
                        <div className="text-center">
                            <div className="imgcontainer p-3" style={{height:'25vh', width: '100%'}}> 
                                {getSectorImage(sector)}
                            </div> 
                        </div>
                        <div className="container rounded-2 shadow" style={{ width: '100%'/*, height:'60vh', overflowY: 'auto'*/ }}> 
                            <div className="row row-cols-auto">
                            {
                                sectorCompanies ? (
                                        sectorCompanies.map((company, index) => (
                                            <div className="col-4 p-3"> 
                                                <CompanyCard key={index} company={company} />
                                            </div>
                                        )
                                    )
                                )
                                : 
                                (
                                    <p>No se encontraron empresas de {sector}.</p>
                                )
                            } 
                            </div>
                        </div>
                    </>
                )
                :
                (
                    <div className="company-carousel" style={{ width: '100%', overflow: 'hidden' }}> 
                        <div className="company-carousel-inner" style={{ display: 'flex', transition: 'transform 0.5s ease', ...getTransformStyle() }}> 
                            {
                                sectorCompanies ? (
                                        sectorCompanies.map((company, index) => (
                                            <div className="col-4 p-3"> 
                                                <CompanyCard key={index} company={company} />
                                            </div>
                                        )
                                    )
                                )
                                : (
                                    <p>No se encontraron empresas de {sector}.</p>
                                )
                            } 
                        </div> 
                        <button className="company-carousel-button left" onClick={() => handleMoveCarousel(-1)}>&#10094;</button> 
                        <button className="company-carousel-button right" onClick={() => handleMoveCarousel(1)}>&#10095;</button> 
                    </div>
                )
            }
        </>
    )
};