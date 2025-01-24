import React, { useState } from "react";
import { getStringDate } from "../../utils/formattedDate";

export const HiringElement = ({num, company}) => {
    const [isChecked, setIsChecked] = useState(false); 
    const [isDivVisible, setIsDivVisible] = useState(true); 

    const handleCheckboxChange = () => { 
        setIsChecked(!isChecked); 
    }; 

    const handleRemoveDiv = () => { 
        setIsDivVisible(false); 
    };

    return (
            isDivVisible && (
                <div
  className="card hiring-card d-flex align-items-center py-2 ps-4 pe-2 fs-5 flex-wrap"
  style={{ backgroundColor: isChecked ? 'lightgreen' : 'transparent' }}
>
  <div className="d-flex w-100">
    {/* Imagen Contratado */}
    <div className="imagen-contratado me-3 overflow-hidden">
      <img
        className="imagen-hiring"
        src={
          process.env.RUTA_LOGOS + `${company.imagen_url}` + "?raw=true"
        }
        alt={'logo: ' + company.imagen_url}
        style={{ height: '5vh' }}
      />
    </div>
    {/* Información Contratado */}
    <div className="info-hiring">
      <h5 className="text-success fw-semibold m-0 text-start">
        {company ? company.nombre.toUpperCase() : "COMPANY EXAMPLE"}
      </h5>
      <p className="fs-6 fw-bold m-0 p-0 text-start">
        {company ? company.sector : getStringDate()}
      </p>
      <p className="fs-6 m-0 p-0 text-start">
        {company ? company.descripcion : getStringDate()}
      </p>
      <p className="fs-6 fw-light m-0 p-0 text-start">
        Contratado en el día {getStringDate()}
      </p>
      <div className="check-delete-bar d-flex mt-2 justify-content-end bg-light">
        <div
          className="px-3 rounded-pill icon-hover clickable"
          onClick={handleCheckboxChange}
        >
          <i className="fa-solid fa-check"></i>
        </div>
        <div
          className="px-3 rounded-pill icon-hover clickable"
          onClick={handleRemoveDiv}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
  </div>
</div>
            )
    )
};