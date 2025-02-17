import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Companies } from "./pages/companies";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Contacto } from "./pages/contacto";
import { QuienesSomos } from "./pages/quienesSomos";
import { Servicios } from "./pages/servicios";
import { DashboardUser } from "./pages/dashboardUser";
import { InfoEmpresa } from "./pages/infoEmpresa";
import { RegistroEmpresa } from "./pages/registroEmpresa";
import { ResetPassword } from "./pages/resetPassword";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop />
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<Servicios />} path="/servicios" />
                    <Route element={<Companies />} path="/companies/:paramId" />
                    <Route element={<Contacto />} path="/contacto" />
                    <Route element={<QuienesSomos />} path="/quienes-somos" />
                    <Route element={<InfoEmpresa />} path="/info-empresa" />
                    <Route element={<DashboardUser />} path="/dashboard-user" />
                    <Route element={<RegistroEmpresa />} path="/registro-empresa" />
                    <Route path="/reset-password/:decodeToken" element={<ResetPassword />} />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
