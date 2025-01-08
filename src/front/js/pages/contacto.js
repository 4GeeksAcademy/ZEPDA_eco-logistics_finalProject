import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imagen from "../../img/zepda-web-img/Driving-Green-Email-Marketing-for-Eco-Friendly-Products-scaled-1-2.webp";


export const Contacto = () => {
    const { store, actions } = useContext(Context);
    

    return (


        <> 
     
        
        <div className="container mt-4">
            <h1>Contacto</h1>
            <div className="contacto-img-container">
                <img src={imagen} className="contacto-img" alt="contacto" />
            </div>
        
        <p className="mt-5">Tienes alguna duda o necesitas información sobre nuestros servicios? Escríbenos sin compromiso y te ayudaremos a resolver tus dudas.</p>
            <div className="mb-3 col-md-6">
                <label for="exampleFormControlInput1" className="form-label">Email</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div className="mb-3 col-md-6">
                <label for="exampleFormControlTextarea1" className="form-label">Mensaje</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <button className="btn mt-2">Enviar</button>
            </div>
            </div>
        </>
    )
}