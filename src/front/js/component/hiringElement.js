import React from "react";

export const HiringElement = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center border-bottom py-2 ps-4 pe-2 fs-5">
                <h5 className="text-success fw-semibold m-0 text-start">ITENE RESEARCH CENTER</h5> 
                <div className="d-flex float-end">
                    <div className="px-3 rounded-pill icon-hover clickable" onClick={() => {}}>
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div className="px-3 rounded-pill icon-hover clickable" onClick={() => {}}>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div>
        </>
    )
};