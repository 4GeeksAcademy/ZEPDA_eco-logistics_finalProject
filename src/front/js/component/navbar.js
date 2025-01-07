// import React from "react";
// import { Link } from "react-router-dom";
// import zpdalogo from "../../img/zepdalogo.png"

// export const Navbar = () => {
//   return (
//     <>
//       <nav className="container navbar navbar-expand-lg bg-body-white">
//         <div className="container-fluid">
//           <Link to={"/"} className="navbar-logo"><img src={zpdalogo} /></Link>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ms-auto d-flex gap-3">
//               <li className="nav-item">
//                 <Link to={"/"} className="nav-link text-black" aria-current="page" href="#">Servicios</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/"} className="nav-link text-black" href="#">Empresas</Link>
//               </li>
//               <li className="nav-item dropdown">
//                 <Link to={"/"} className="nav-link text-black" href="#" >
//                   Quiénes somos
//                 </Link>

//               </li>
//               <li className="nav-item">
//                 <Link to={"/"} className="nav-link text-black">Contacto</Link>
//               </li>
//             </ul>


//           </div>
//           <button className="btn" type="submit">Login</button>
//         </div>
//       </nav>
//     </>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Navbar");
  }, [store.token, store.token1] );

  const handleClickUser = () => {
    !store.token && navigate("/login");
    actions.logOut("token");
  };
  const handleClickEmpresa = () => {
    !store.token1 && navigate("/loginEmpresa");
    actions.logOut("token1");
  };
  
  return (
    
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        {store?.token && (
          <Link to="/private">     
            <span className="navbar-brand mb-0 h1">User Control Panel </span>
          </Link>
        )}
        {store?.token1 && (
          <Link to="/privateEmpresa">       
            <span className="navbar-brand mb-0 h1">Company Control Panel</span>
          </Link>
        )}
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-secondary" onClick={handleClickUser}>
              {store?.token ? "Logout (Usuario)" : "Login / Registro (Usuario)"}
            </button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/loginEmpresa">
            <button className="btn btn-success" onClick={handleClickEmpresa}>
              {store?.token1 ? "Logout (Empresa)" : "Login / Registro (Empresa)"}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
