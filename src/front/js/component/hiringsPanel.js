import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { HiringElement } from "./hiringElement";

export const HiringsPanel = () => {
    const [elements, setElements] = useState([]);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const fetchHirings = async () => {
            await actions.getHirings(store.profile.id);
            
            const contrataciones = store.contrataciones.map((company, index) => (
                <HiringElement key={index} num={index} company={company} />
            ));
            setElements(contrataciones);
        };

        fetchHirings();
    }, []);

    return (
        <>
            <div className="col-6 p-3"> 
                <h1 className="text-start fw-normal fs-5 mb-3">CONTRATACIONES</h1>
                <div className="card rounded-2 shadow" style={{height:'50vh', overflowY: 'auto'}}> 
                    {elements}
                </div> 
            </div>
        </>
    )
};