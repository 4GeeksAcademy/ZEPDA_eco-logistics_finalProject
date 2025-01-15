import React, { useState } from "react";

export const HiringElement = () => {
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
                    <h5 className="text-success fw-semibold m-0 text-start">ITENE RESEARCH CENTER</h5> 
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