import React from 'react';
import { Route } from 'react-router-dom';
import Login from "components/Login/Login";
import Nav from "components/Nav/Nav";
import PanelControl from 'components/PanelControlStudents/panelControl';


function App() {


  return (
    <>
      <Nav />
      <Route exact path='/' component={Login} />
      <Route exact path='/PanelControlStudent' component={PanelControl} />
    </>
  );
}

export default App;
