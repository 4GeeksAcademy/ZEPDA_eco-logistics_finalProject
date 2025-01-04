import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Companies = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <h1>Página empresas</h1>
        </>
    );
};
