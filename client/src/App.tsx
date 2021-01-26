import React from "react";
import { Route } from "react-router-dom";
import Login from "components/Login/Login";
import Nav from "components/Nav/Nav";
import Cohortes from "components/Cohortes/Cohortes";
import Activos from "components/Cohortes/Activos";
import PanelControlStudents from "components/PanelControlStudents/panelControl";
import Home from "components/Home/Home";
import Registro from "components/Registro/Registro";

function App() {
  return (
    <>
      <Nav />
      <Route exact path="/" component={Login} />
      <Route exact path="/cohortes" component={Cohortes} />
      <Route exact path="/activos/:id" component={Activos} />
      <Route
        exact
        path="/PanelControlStudent"
        component={PanelControlStudents}
      />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Registro" component={Registro} />
    </>
  );
}

export default App;
