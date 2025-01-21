import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import zpdalogo from "../../img/zepdalogo.png";
import { LoginRegisterModal } from "./loginRegisterModal";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false); // Cerramos la modal
  const handleShowModal = () => setShowModal(true); // Mostramos la modal
  const toggleForm = () => setIsLogin(!isLogin); // Alternar entre login y registro

  const logoutUser = () => {
    actions.logoutUser();
    navigate("/"); // Redirigir a la página principal o de login
  };

  useEffect(() => {
    if (store.token) {
      console.log("navbar: get user");
      actions.getUserProfile();
    }
  }, [store.token]);

  return (
    <>
      <nav className="container navbar navbar-expand-lg bg-body-white">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-logo"><img src={zpdalogo} alt="Logo" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto d-flex gap-3">
              {store.token && (
                <li className="nav-item">
                  <Link to={"/dashboard-user"} className="nav-link text-black">
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="nav-item"><Link to={"/servicios"} className="nav-link text-black">Servicios</Link></li>
              <li className="nav-item"><Link to={"/companies/all"} className="nav-link text-black">Empresas</Link></li>
              <li className="nav-item"><Link to={"/quienes-somos"} className="nav-link text-black">Quiénes somos</Link></li>
              <li className="nav-item"><Link to={"/contacto"} className="nav-link text-black">Contacto</Link></li>
            </ul>
            {!store.token ? (
              <button className="btn" onClick={handleShowModal}>Login</button>
            ) : (
              <button className="btn btn-logout" onClick={logoutUser}>Logout</button>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de Login/Registro */}
      <LoginRegisterModal 
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        isLogin={isLogin}
        toggleForm={toggleForm}
        actions={actions}
      />
    </>
  );
};
