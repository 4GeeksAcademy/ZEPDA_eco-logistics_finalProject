import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import { HiringContration } from "../component/hiringContrarion";

export const InfoEmpresa = () => {
    const location = useLocation();
    const { company } = location.state; // Extrae los datos de la empresa desde el estado
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const disabledMessage = "Necesitas loguearte para contratar servicios";

    return (
        <div className="container mt-5">
            <h1 className="text-center">Información de la Empresa</h1>
            <div className="company-details shadow p-3 mb-5 bg-white rounded mx-auto" style={{ maxWidth: '600px' }}>
                <img
                    src={company.imagen_url ? process.env.RUTA_LOGOS + `${company.imagen_url}` + "?raw=true" : "../zepdalogo.png"}
                    alt={company.imagen_url ? 'logo: ' + process.env.RUTA_LOGOS + `${company.imagen_url}` + "?raw=true" : "../zepdalogo.png"}
                    style={{ height: '150px', width: 'auto', maxWidth: '100%' }}
                />
                <h2 className="text-center">{company.nombre}</h2>
                <p><strong>País:</strong> {company.pais}</p>
                <p><strong>Descripción:</strong> {company.descripcion}</p>
                <p><strong>Teléfono:</strong> {company.telefono}</p>
                <p><strong>Web:</strong> <a href={company.web} target="_blank" rel="noopener noreferrer">{company.web}</a></p>
                <p><strong>CIF:</strong> {company.cif}</p>
                <p><strong>Dirección:</strong> {company.direccion}</p>

                {!isLoggedIn ? (
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-disabled">{disabledMessage}</Tooltip>}
                    >
                        <div>
                            <Button
                                variant="secondary"
                                onClick={handleShow}
                                className="d-block mx-auto"
                                disabled
                            >
                                Contratar Servicio
                            </Button>
                        </div>
                    </OverlayTrigger>
                ) : (
                    <Button
                        variant="btn btn"
                        onClick={handleShow}
                        className="d-block mx-auto"
                    >
                        Contratar Servicio
                    </Button>
                )}
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contratación de Servicios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HiringContration handleClose={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
};

