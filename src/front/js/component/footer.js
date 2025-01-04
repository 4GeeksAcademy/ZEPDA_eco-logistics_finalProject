import React, { Component } from "react";
import zepdaImagotipo from "../../img/zepdaimagotipoz.png";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="container footer d-flex mt-5 ">
		<div>
			<img className="logofooter" src={zepdaImagotipo} alt="zepdaimagotipo" height={100} />
		</div>
		<div>
			<h5>ZEPDA Eco-logistics © 2025 </h5>
		</div>

		<div className="text-end">
			<Link className="links" to="/contacto"><p>Contacto</p></Link>
			<p>Quiénes somos</p>
		</div>

	</footer>
);
