import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { JumbotronCarousel } from "../component/jumbocarousel";
import "../../styles/home.css";
import { NewsSection } from "../component/NewsSection";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<>
		
		<JumbotronCarousel/>
		<div className="container mt-4">
			<h1> 
				El cambio ya empezó, el momento de sumarse es ahora!
			</h1>
			<p>
			Trabajamos para disminuir el impacto ambiental y generar acciones positivas para el planeta y la sociedad. 
			Te ofrecemos las mejores soluciones eco-friendly para tu empresa. El cambio ya empezó, el momento de sumarse es ahora!
			</p>
			<p>
			Como funciona <strong>Zepda Eco-logistics</strong>?
			</p>
			<p>
			En esta plataforma podrás encontrar soluciones sostenibles para que tu empresa sea más eco-friendly. 
			Podrás encontrar servicios que te ayudarán a disminuir el impacto ambiental de tu empresa. Además, 
			podrás conocer el impacto positivo que generas al adquirir estos productos y servicios.
			Sólo tienes que crear una cuenta en nuestra plataforma y empezar a disfrutar de los beneficios de ser eco-friendly.
			</p>
			<button className="btn">súmate al cambio</button>

			<NewsSection/>

		</div>
		</>
	);
};
