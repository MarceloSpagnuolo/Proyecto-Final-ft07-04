import React from 'react';
import { Route } from 'react-router-dom';
import Login from "components/Login/Login";
import Nav from "components/Nav/Nav";
import PanelControlStudents from 'components/PanelControlStudents/panelControl';
import Home from 'components/Home/Home';
import Students from 'components/PanelControlStudents/AllStudents/students';


function App() {
  return (
    <>
      <Nav />
      <Route exact path='/' component={Login} />
      <Route exact path='/PanelControlStudent' component={PanelControlStudents} />
      <Route exact path='/Home' component={Home} />
      <Route exact path='/students' component={Students} />

    </>
  );
}

export default App;
