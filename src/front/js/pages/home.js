import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { JumbotronCarousel } from "../component/jumbocarousel";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<JumbotronCarousel/>
	);
};
