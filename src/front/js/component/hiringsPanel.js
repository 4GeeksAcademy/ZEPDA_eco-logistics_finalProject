import React from "react";
import { HiringElement } from "./hiringElement";

export const HiringsPanel = () => {
    return (
        <>
            <div className="col-6 p-3"> 
                <h1 className="text-start fw-normal fs-5 mb-3">CONTRATACIONES</h1>
                <div className="card rounded-5" style={{height:'50vh', overflowY: 'auto'}}> 
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                    <HiringElement />
                </div> 
            </div>
        </>
    )
};