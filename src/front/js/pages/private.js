import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Dashboard from "./dashboard";
import { useLocalStorage } from "../hooks/hooks";

const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(store.token);
    !store.token && navigate("./navbar");
  }, [store.token]);
  console.log(store.profile);

  return (
    <>
      {store?.token ? <Dashboard nombre={store.profile?.nombre} /> : navigate("/")}
      {/*navigate("/")*/}
    </>
  );
};

export default Private;
