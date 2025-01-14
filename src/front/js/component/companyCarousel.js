import React, { useState, useContext } from "react";
import { CompanyCard } from "../component/companyCard";
import { Context } from '../store/appContext';


export const CompanyCarousel = ({sector}) => {
    // App Store
    const { store } = useContext(Context);
    const sectorCompanies = store.companies[sector];
    // Component Logic Variables
    const [currentIndex, setCurrentIndex] = useState(0); 
    const totalItems = 4; // los que hay -2
    const itemsToShow = 3; 
    
    const handleMoveCarousel = (direction) => { 
        const newIndex = (currentIndex + direction + totalItems) % totalItems; 
        setCurrentIndex(newIndex); 
    }; 
    
    const getTransformStyle = () => { 
        const offset = -currentIndex * (100 / itemsToShow); 
        return { transform: `translateX(${offset}%)` }; 
    };

    return (
        <>
            <h1 className="text-start fw-normal fs-5 mb-0">EMPRESAS DE {sector}</h1>
            <div className="company-carousel" style={{ width: '100%', overflow: 'hidden' }}> 
                <div className="company-carousel-inner" style={{ display: 'flex', transition: 'transform 0.5s ease', ...getTransformStyle() }}> 
                    {
                        sectorCompanies ? (
                                sectorCompanies.map((company, index) => (
                                    <CompanyCard key={index} company={company} />
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
        </>
    )
};