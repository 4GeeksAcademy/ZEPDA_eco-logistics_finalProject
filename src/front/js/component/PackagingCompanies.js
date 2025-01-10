import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const PackagingCompanies = () => {
    const { store } = useContext(Context);
    const packagingCompanies = store.companies["Packaging"];

    return (
        <div>
            {packagingCompanies ? (
                packagingCompanies.map((company, index) => (
                    <div key={index}>
                        <h2>{company.nombre}</h2>
                        <p>Ubicación: {company.ubicacion}</p>
                        <p>Sector: {company.sector}</p>
                        <p>Email: {company.email}</p>
                        <p>Teléfono: {company.telefono}</p>
                        <p>Web: <a href={company.web} target="_blank" rel="noopener noreferrer">{company.web}</a></p>
                        <p>Dirección: {company.direccion}</p>
                        <p>Descripción: {company.descripcion}</p>
                    </div>
                ))
            ) : (
                <p>No se encontraron empresas de Packaging.</p>
            )}
        </div>
    );
};

export default PackagingCompanies;
