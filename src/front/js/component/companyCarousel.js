import React, { useState } from "react";
import { CompanyCard } from "../component/companyCard";


export const CompanyCarousel = () => {
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
            <div className="company-carousel" style={{ width: '100%', overflow: 'hidden' }}> 
                <div className="company-carousel-inner" style={{ display: 'flex', transition: 'transform 0.5s ease', ...getTransformStyle() }}> 
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                    <CompanyCard />
                </div> 
                <button className="company-carousel-button left" onClick={() => handleMoveCarousel(-1)}>&#10094;</button> 
                <button className="company-carousel-button right" onClick={() => handleMoveCarousel(1)}>&#10095;</button> 
            </div>
        </>
    )
};