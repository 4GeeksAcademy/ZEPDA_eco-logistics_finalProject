import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import zpdalogo from "../../img/zepdalogo.png"
import { Modal, Button } from "react-bootstrap";
import { Context } from "../store/appContext";
export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const toggleForm = () => setIsLogin(!isLogin);
  
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    password_check: "",
  });

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalMessage, setModalMessage] = useState("");

  // const toggleModal = (message) => {
  //   setModalMessage(message);
  //   setIsModalOpen(!isModalOpen);
  // };

  const { store, actions } = useContext(Context);
  const [isShow, setIsShown] = useState(false);
  const registerUser = async (event) => {
    event.preventDefault();
    // console.log("funciona")
    if (user.contraseña === user.password_check && user.contraseña !== "") {
      const createUser = await actions.createUser(user);
      if (createUser) {
        //  toggleModal("Usuario creado sastisfactoriamente!");
        setUser({
          ...user,
          nombre: "",
          email: "",
          contraseña: "",
          password_check: "",
        });
      //  setIsShown(!isShow);
      // } else {
        // toggleModal("Upss! ocurrió un error inesperado!");
      }
    // } else {
      // toggleModal("Contraseñas no coinciden!");
      setUser({ ...user, contraseña: "", password_check: "" });
    }
  };

  // const [user1, setUser1] = useState({
  //   nif: "",
  //   nombre: "",
  //   sector: "",
  //   direccion: "",
  //   email: "",
  //   descripcion: "",
  //   web: "",
  //   contraseña: "",
  //   password_check: "",
  // });

  // const registerEmpresa = async (event) => {
  //   event.preventDefault();
  //   if (user1.contraseña === user1.password_check && user1.contraseña !== "") {
  //     const createUser1 = await actions.createCompany(user1);
  //     if (createUser1) {
  //       toggleModal("Empresa creada satisfactoriamente!");
  //       setUser1({
  //         ...user1,
  //         nif: "",
  //         nombre: "",
  //         sector: "",
  //         direccion: "",
  //         email: "",
  //         descripcion: "",
  //         web: "",
  //         contraseña: "",
  //         password_check: "",
  //       });
  //       setIsShown(!isShow);
  //     } else {
  //       toggleModal("Upss! ocurrió un error inesperado!");
  //     }
  //   } else {
  //     toggleModal("Contraseñas no coinciden!");
  //     setUser1({ ...user1, contraseña: "", password_check: "" });
  //   }
  // };
  return (
    <>
      <nav className="container navbar navbar-expand-lg bg-body-white">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-logo"><img src={zpdalogo} /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto d-flex gap-3">
            <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link text-black" aria-current="page" href="#">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to={"/servicios"} className="nav-link text-black" aria-current="page" href="#">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link to={"/companies"} className="nav-link text-black" href="#">Empresas</Link>
              </li>
              <li className="nav-item dropdown">
                <Link to={"/quienes-somos"} className="nav-link text-black" href="#" >
                  Quiénes somos
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contacto"} className="nav-link text-black">Contacto</Link>
              </li>
            </ul>
            <button className="btn" onClick={handleShowModal}>
              Login
            </button>
          </div>
        </div>
      </nav>
      {/* Modal de Login y Registro */}

      {/* se realiza el logeo */}

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

            // se realiza el registro de usuario****************************************************************************************************
            <div>
              <form onSubmit={registerUser}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Ingresa tu nombre"
                    onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                  />
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresa tu correo"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                    onChange={(e) => setUser({ ...user, contraseña: e.target.value })}
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
                    onChange={(e) => setUser({ ...user, password_check: e.target.value })}
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

//falta el registro de empresa!!!!