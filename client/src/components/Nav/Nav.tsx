import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <img
        alt=""
        src="https://cdn.discordapp.com/attachments/801584401611620383/802229191889387610/HM-BLANCO.png"
        width="70"
        //height="30"
        id="Navigation-Logo"
        className="d-inline-block align-top"
      />{" "}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Pepito" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#">Mi perfil</NavDropdown.Item>
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Alumnos" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#">Invitaciones</NavDropdown.Item>
            <NavDropdown.Item href="#">Gestión de Alumnos</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Cohortes" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#">Gestión de Cohortes</NavDropdown.Item>
            <NavDropdown.Item href="#">Gestión de Grupos</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
