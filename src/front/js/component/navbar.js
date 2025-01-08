import React, { useState } from "react";
import { Link } from "react-router-dom";
import zpdalogo from "../../img/zepdalogo.png"
import { Modal, Button } from "react-bootstrap";

export const Navbar = () => {
	return (
	<>
	<nav className="container navbar navbar-expand-lg bg-body-white">
  <div className="container-fluid">
    <Link to={"/"}className="navbar-logo"><img src={zpdalogo}/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto d-flex gap-3">
        <li className="nav-item">
          <Link to={"/"} className="nav-link text-black" aria-current="page" href="#">Servicios</Link>
        </li>
        <li className="nav-item">
          <Link to={"/"} className="nav-link text-black" href="#">Empresas</Link>
        </li>
        <li className="nav-item dropdown">
          <Link to={"/"} className="nav-link text-black" href="#" >
            Quiénes somos
          </Link>
   
        </li>
        <li className="nav-item">
          <Link to={"/"} className="nav-link text-black">Contacto</Link>
        </li>
      </ul>
      
      
    </div>
        <button className="btn" type="submit">Login</button>
  </div>
</nav>
	</>
	);
};