import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "Store/Actions/Users";
import { SSL_OP_NO_QUERY_MTU } from "constants";
import "./Registro.css";

interface Registro {
  firstname?: string;
  lastname?: string;
  email?: any;
  password?: string;
  comparePassword?: string;
  githubId?: string;
  googleId?: string;
  thumbnail?: Buffer;
}

const Registro = (props: any): JSX.Element => {
  const [mailTok, setToken] = useState(useLocation().search);
  const [estado, setEstado] = useState<Registro>({});
  const dispatch = useDispatch();

  useEffect(() => {
    /*     if (mailTok.includes("registro")) {
      setToken(mailTok.split("=")[1]);
      const email = jwt.decode(mailTok);
      if (!email) {
        alert("Error de Token");
        window.location.href = "/";
      } else {
        setEstado({ email: email });
      }
    } else {
      alert("Usuario no autorizado");
      window.location.href = "/";
    } */
    setEstado({ email: "lu4huf@gmail.com" });
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setEstado({
      ...estado,
      [e.target.name]: e.target.value,
    });
    console.log(estado);
  }

  function handleSubmit() {
    if (!estado.firstname) {
      Swal.fire("Debe Ingresar su nombre");
      return;
    }
    if (!estado.lastname) {
      Swal.fire("Debe Ingresar su apellido");
      return;
    }
    if (estado.password !== estado.comparePassword) {
      Swal.fire("Contraseñas no coinciden");
      return;
    }
    if (!estado.githubId) {
      Swal.fire("Es obligatorio tener cuenta en GitHub");
    }
    // dispatch(postUser(estado));
    console.log(estado)
  }

  return (
    <>
      <img className="backImgRegistro" src="https://cdn.discordapp.com/attachments/764979688446885898/803742896964370432/fondo.png" alt="" />
      <div className="divContainerRegistro">
        <h1 className="titleRegistro">REGISTRO</h1>
        {/* <form className=""> */}
        <div className="nombreRegisto">
          <input
            autoFocus={true}
            type="firstname"
            name="firstname"
            placeholder="Nombre"
            className=""
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="apellidoRegistro">
          <input
            type="lastname"
            name="lastname"
            placeholder="Apellido"
            className=""
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="emailRegistro">
          <input
            readOnly
            type="email"
            name="email"
            value={estado.email}
            className=""
          />
        </div>
        <div className="passRegistro">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className=""
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="cpassRegistro">
          <input
            type="password"
            name="comparePassword"
            placeholder="Repetir Contraseña"
            className=""
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="iconGitRegistro">
          <img src="https://cdn.discordapp.com/attachments/764979688446885898/803751928596004926/GitHubLogo.png" />
        </div>
        <div className="gitRegistro">
          <input
            type="name"
            name="githubId"
            placeholder="GitHubId"
            className=""
            onChange={(e) => handleInput(e)}
          />
        </div>
        {/* </form> */}
        <div className="btnRegistro">
          <button className="" onClick={() => handleSubmit()}>
            Entrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Registro;
