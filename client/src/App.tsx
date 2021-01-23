import React from "react";
import { Route } from "react-router-dom";
import Login from "components/Login/Login";
import Nav from "components/Nav/Nav";

function App() {
  return (
    <>
      <Nav />
      <Route exact path="/" component={Login} />
    </>
  );
}

export default App;
