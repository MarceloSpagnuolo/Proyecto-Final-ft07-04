import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Henry Manager</Navbar.Brand>
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
