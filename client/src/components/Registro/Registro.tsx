import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "Store/Actions/Users";
import { SSL_OP_NO_QUERY_MTU } from "constants";

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
    dispatch(postUser(estado));
  }

  return (
    <>
      <div className="">
        <form className="">
          <div className="">
            <label className="" htmlFor="firstname">
              Nombre
            </label>
            <br></br>
            <input
              autoFocus={true}
              size={40}
              type="firstname"
              name="firstname"
              className=""
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="">
            <label className="" htmlFor="lastname">
              Apellido
            </label>
            <br></br>
            <input
              size={40}
              type="lastname"
              name="lastname"
              className=""
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="">
            <label className="" htmlFor="email">
              Email
            </label>
            <br></br>
            <input
              readOnly
              size={40}
              type="email"
              name="email"
              value={estado.email}
              className=""
            />
          </div>
          <div className="">
            <label className="" htmlFor="password">
              Contraseña
            </label>
            <br></br>
            <input
              size={40}
              type="password"
              name="password"
              className=""
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="">
            <label className="" htmlFor="comparePassword">
              Repetir contraseña
            </label>
            <br></br>
            <input
              size={40}
              type="password"
              name="comparePassword"
              className=""
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="">
            <label className="" htmlFor="githubId">
              GithubId
            </label>
            <br></br>
            <input
              size={40}
              type="name"
              name="githubId"
              className=""
              onChange={(e) => handleInput(e)}
            />
          </div>
        </form>
        <div className="">
          <button className="" onClick={() => handleSubmit()}>
            Entrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Registro;
