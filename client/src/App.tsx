import React from "react";
import { Route } from "react-router-dom";
import Login from "components/Login/Login";
import Nav from "components/Nav/Nav";
import Home from 'components/Home/Home';
import GrupoDetail from "components/GrupoDetail/GrupoDetail";
import Registro from "components/Registro/Registro";
import Cohortes from "components/Cohortes/Cohortes";
import Activos from "components/Cohortes/Activos";
import Inactivos from "components/Cohortes/Inactivos";
import PanelControlStudents from 'components/PanelControlStudents/panelControl';
import Carga from "components/Notas/Carga";
import Grupos from 'components/Grupos/GruposCreate';
import MiCohorte from "./components/PMsYAlumnos/MiCohorte";
import Rendimiento from "./components/PMsYAlumnos/Rendimiento";
import Profile from './components/Profile/Profile';
import MiGrupo from "./components/PMsYAlumnos/MiGrupo";
import Estadisticas from "components/Estadisticas/Estadisticas";
import Panel from "components/PMs/Panel";
import ResetPassEmail from "./components/Profile/ResetPassEmail";
import EstadisticaUser from "components/Estadisticas/EstadisitcaAlmun";
import EstadisticasCohorte from "components/Estadisticas/EstadisticasCohorte";


function App() {
  return (
    <>
      <Nav />
      <Route exact path='/' component={Login} />
      <Route exact path='/newPass/Return' component={ResetPassEmail} />
      <Route exact path='/MiCohorte/:id' component={MiCohorte} />
      <Route exact path='/MisDatos/:id' component={Rendimiento} />
      <Route exact path='/Home' component={Home} />
      <Route exact path='/GruopDetail/:id' component={GrupoDetail} />
      <Route exact path='/Registro' component={Registro} />
      <Route exact path="/cohortes" component={Cohortes} />
      <Route exact path="/activos/:id" component={Activos} />
      <Route exact path="/inactivos/:id" component={Inactivos} />
      <Route exact path='/PanelControlStudent' component={PanelControlStudents} />
      <Route exact path='/Grupos' component={Grupos} />
      <Route path='/Profile/:id' component={Profile} />
      <Route exact path='/Grupos/:id' component={Grupos} />
      <Route exact path='/MiGrupo/:id' component={MiGrupo} />
      <Route exact path="/cargaNotas" component={Carga} />
      <Route exact path="/panel" component={Panel} />
      <Route exact path='/estadisticas/:id' component={Estadisticas} />
      <Route exact path='/estadisticaUser' component={EstadisticaUser} />
      <Route exact path='/estadisticasCohorte/:id' component={EstadisticasCohorte} />
    </>
  );
}

export default App;