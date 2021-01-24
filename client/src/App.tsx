import React from 'react';
import { Route } from 'react-router-dom';
import Login from "components/Login/Login";
import Nav from "components/Nav/Nav";
import PanelControl from 'components/PanelControlStudents/panelControl';
import Home from 'components/Home/Home';



function App() {
  return (
    <>
      <Nav />
      <Route exact path='/' component={Login} />
      <Route exact path='/PanelControlStudent' component={PanelControl} />
      <Route exact path='/Home' component={Home} />
    </>
  );
}

export default App;
