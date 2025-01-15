import React, { useEffect, useState } from "react";
import { HiringElement } from "./hiringElement";

export const HiringsPanel = () => {
    const [elements, setElements] = useState([]);

    useEffect(() => {
        const newElements = []; 
        for (let i = 0; i < 10; i++) { 
            newElements.push(<HiringElement key={i} num={i} />); 
        } 
        setElements(newElements);
    }, [])

    return (
        <>
            <div className="col-6 p-3"> 
                <h1 className="text-start fw-normal fs-5 mb-3">CONTRATACIONES</h1>
                <div className="card rounded-5" style={{height:'50vh', overflowY: 'auto'}}> 
                    {elements}
                </div> 
            </div>
        </>
    )
};