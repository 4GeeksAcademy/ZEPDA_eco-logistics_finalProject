import React from "react";
import { useLocation } from "react-router-dom"; // Importa el hook useLocation

export const InfoEmpresa = () => {
    const location = useLocation(); // Obtiene el objeto de ubicación
    const { company } = location.state; // Extrae los datos de la empresa desde el estado

    return (
        <div className="container">
            <h1>Información de la Empresa</h1>
            <div className="company-details">
                <img src={'../' + company.logo} alt={`Logo de ${company.nombre}`} style={{ height: '150px' }} />
                <h2>{company.nombre}</h2>
                <p><strong>País:</strong> {company.pais}</p>
                <p><strong>Ubicación:</strong> {company.ubicacion}</p>
                <p><strong>Descripción:</strong> {company.descripcion}</p> {/* Si tienes una descripción de la empresa */}
            </div>
        </div>
    );
};

