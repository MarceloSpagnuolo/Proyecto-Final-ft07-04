import React from "react";
import { Route } from "react-router-dom";
import Login from "components/Login/Login";
import Nav from "components/Nav/Nav";
import Cohortes from "components/Cohortes/Cohortes";
import Activos from "components/Cohortes/Activos";

function App() {
  return (
    <>
      <Nav />
      <Route exact path="/" component={Login} />
      <Route exact path="/cohortes" component={Cohortes} />
      <Route exact path="/activos/:id" component={Activos} />
    </>
  );
}

export default App;
