import React, { useState } from "react";
import { Link } from "react-router-dom";
import zpdalogo from "../../img/zepdalogo.png"
import { Modal, Button } from "react-bootstrap";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin,setIsLogin] = useState(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const toggleForm = () => setIsLogin(!isLogin); //cambia entre login y registro
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
      <button className="btn" onClick={handleShowModal}>
              Login
            </button>
    </div>
  </div>
</nav>
	  {/* Modal de Login y Registro */}
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? "Login" : "Registro"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLogin ? (
            <div>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <Button variant="primary" type="submit">
                  Iniciar sesión
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <form>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu nombre"
                  />
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirma tu contraseña"
                  />
                </div>
                <Button variant="primary" type="submit">
                  Registrar
                </Button>
              </form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="link" onClick={toggleForm}>
            {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};