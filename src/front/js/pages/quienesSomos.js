import React, { useContext } from "react";
import { Context } from "../store/appContext";
import somos from "../../img/zepda-web-img/manos-carteles-eco.webp";
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
                Tienes alguna pregunta de como funciona Zepda Eco-logistics? <Link className="links" to="/contacto"><strong>contáctanos</strong></Link>.
                </p>
                <p>
                    Estamos ubicados en:<br></br>
                    calle del Sol,1<br></br>
                    46001<br></br>
                    Valencia, España
                </p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8445.54790807675!2d-0.38343609177274723!3d39.41379124497601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1736361006967!5m2!1ses!2ses" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div >
        
     
        </>)}