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
                        <p><strong>NOMBRE:</strong> "ITENE RESEARCH CENTER"</p>
                        <p><strong>PAIS:</strong> "United Kingdom"</p>
                        <p><strong>UBICACION:</strong> "London, UK"</p>
                        <p><strong>SECTOR:</strong> "Packaging"</p>
                        <p><strong>EMAIL:</strong> "contact@iteneuk.co.uk"</p>
                        <p><strong>TELEFONO:</strong> "+44 20 1234 5678"</p>
                        <p><strong>WEB:</strong> "https://www.iteneuk.co.uk"</p>
                        <p><strong>DIRECCION:</strong> "123 Packaging Ave, London, UK"</p>
                        <p><strong>DESCRIPCION:</strong> "Centro líder en investigación y desarrollo de soluciones innovadoras de embalaje."</p>
                        <p><strong>NIF:</strong> "GB123456789"</p>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card p-4 shadow-lg" style={{ maxWidth: "1000px", width: "100%" }}>
                    <h1 className="text-center mb-4">API google maps</h1>
                    <h4 className="text-left mb-4">Insertar mapa aqui</h4>
                </div>
            </div>
        </>
    );
};