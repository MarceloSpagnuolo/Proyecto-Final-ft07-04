import React from 'react';
import { Route } from 'react-router-dom';
import Login from "../src/components/Login"

function App() {


  return (
    <>
      <Route exact path='/' component={Login} />
    </>
  );
}

export default App;
