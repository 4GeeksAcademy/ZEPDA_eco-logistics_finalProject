import React, { useState } from "react";

export const InfoEmpresa = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "1000px", width: "100%" }}>
                    <div className="d-flex justify-content-center">
                        <img src="logo-itene-research.png" alt="ITENE Research Center Logo" style={{ maxWidth: "300px" }}/>
                    </div>
                    <div className="text-left mb-4">
                        <div className="mb-4">
                        <h3 className="mb-4">ITENE RESEARCH CENTER</h3>
                        <h5>https://www.iteneuk.co.uk</h5>
                        </div>
                        <p>123 Packaging Ave, London, UK</p>
                        <p>London</p>
                        <p>United Kingdom</p>
                        <p>+44 20 1234 5678</p>
                        <p>contact@iteneuk.co.uk</p>
                        <p>Centro líder en investigación y desarrollo de soluciones innovadoras de embalaje.</p>
                        <button className="btn mt-5">Contratar Servicios</button>
                        
                        
                        
                        
                        
                        
                        
                    </div>
                </div>
            </div>
            
        </>
    );
};