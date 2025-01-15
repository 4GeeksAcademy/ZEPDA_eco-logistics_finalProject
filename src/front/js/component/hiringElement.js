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
                <div className="d-flex justify-content-between align-items-center border-bottom py-2 ps-4 pe-2 fs-5"
                    style={{ backgroundColor: isChecked ? 'lightgreen' : 'transparent' }}>
                    <h5 className="text-success fw-semibold m-0 text-start">{num+1} - {company ? company.nombre.toUpperCase() : "COMPANY EXAMPLE"}</h5> 
                    <p className="fs-6 fw-light m-0 p-0">{company ? company.admission_day : getStringDate()}</p>
                    <div className="d-flex float-end">
                        <div className="px-3 rounded-pill icon-hover clickable" onClick={handleCheckboxChange}>
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <div className="px-3 rounded-pill icon-hover clickable" onClick={handleRemoveDiv}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                </div>
            )
    )
};