import React, { Component } from "react";
import zepdaImagotipo from "../../img/zepdaimagotipoz.png";

export const Footer = () => (
	<footer className="container footer d-flex mt-5 ">
		<div>
			<img className="logofooter" src={zepdaImagotipo} alt="zepdaimagotipo" height={100} />
		</div>
		<div>
			<h5>ZEPDA Eco-logistics © 2025 </h5>
		</div>

		<div className="text-end">
			<p>Contacto</p>
			<p>Quiénes somos</p>
		</div>

	</footer>
);
