import React, { useContext } from "react";
import { Context } from "../store/appContext";
import somos from "../../img/zepdalogo.png";
import { Link } from "react-router-dom";


export const QuienesSomos = () => {
    const { store, actions } = useContext(Context);


    return (


        <>
            <div className="container mt-4">

                <div className="container">
                    <img src={somos} className="contacto-img" alt="contacto" />
                </div>

                <p className="mt-5">Somos un grupo de personas ambiciosas pero comprometidas con el medio ambiente. Por eso hemos decidido crear un lugar único donde puedas encontrar todos los servicios necesarios para que tu pequeña empresa adopte buenas prácticas amigables con nuestro planeta, para así reducir el impacto ambiental a la vez q optimizamos de manera eficiente nuestras funciones empresariales. </p>
                <p>
                    Desde Zepda Eco-logistics te animamos a formar parte de nuestro equipo y unirte a nuestra causa, tanto contratando los servicios de nuestras empresas asociadas como formando parte de nuestros clientes.
                </p>
                <p>
                    Trabajamos con empresas profesionales del sector para ofrecerte los mejores servicios eco-friendly. Nuestro objetivo es que puedas encontrar todo lo que necesitas en un solo lugar, de manera fácil y rápida.
                </p>

                <p>
                Tienes alguna pregunta de como funciona Zepda Eco-logistics? <Link className="links" to="/contacto"><strong>contáctanos</strong></Link>.</p>

        </div >
        
     
        </>)}