import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUser } from "Store/Actions/Users";
import { Formik, Field, ErrorMessage, Form } from "formik";
import "./Registro.css";
import axios from "axios";

/* interface Registro {
  firstname?: string;
  lastname?: string;
  email?: any;
  cohorte?: any;
  password?: string;
  comparePassword?: string;
  githubId?: string;
  googleId?: string;
  thumbnail?: Buffer;
  estado?: Object;
} */

const Registro = (props: any): JSX.Element => {
  const [mailTok, setToken] = useState(useLocation().search);
  const [estado, setEstado] = useState<any>({});
  const dispatch = useDispatch();
  const history = useHistory();
  const user: any = useSelector((state: any) => state.Users.user);
  const url = "http://localhost:3001";

  useEffect(() => {
    if (mailTok.includes("mailToken")) {
      const decodeToken: Object | any = jwt.decode(mailTok.split("=")[1]);
      if (!decodeToken) {
        Swal.fire(
            "Error",
            "Token erróneo",
            "error"
        )
        .then(() => window.location.href="/")
      } else {
        console.log(decodeToken,"Este es el token decodificado");
        const { email, cohorte } = decodeToken;
        console.log( email, cohorte);
        setEstado({ email, cohorte});
      }
    } else {
        Swal.fire(
            "No autorizado",
            "Necesita invitación para registrarse",
            "error"
        )
        .then(() => window.location.href="/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(user).length !== 0) history.push("/home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(estado);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: estado.email,
    password: "",
    comparePassword: "",
    githubId: "",
    cohorte: estado.cohorte
  }

  return (
    <>
      <img
        className="backImgRegistro"
        src="https://cdn.discordapp.com/attachments/764979688446885898/803742896964370432/fondo.png"
        alt=""
      />
      <div className="divContainerRegistro">
        <h1 className="titleRegistro">REGISTRO</h1>
        {/* <form className=""> */}
        <Formik 
          initialValues={ initialValues }
          validate={async (values) => {
            var errors: { [k: string]: any } = {};
            const regPass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/.test(values.password));
            //const regGithub = values.githubId.length > 0 ? await axios.get(`${url}/users/github/${values.githubId}`) : {data: false};
            if(values.firstname.length === 0) errors.firstname="Debe ingresar su nombre";
            if(values.lastname.length === 0) errors.lastname="Debe ingresar su apellido";
            if(values.password.length === 0) {
              errors.password="Debe ingresar una contraseña";
            } else if (!regPass) {
              errors.password="Debe tener entre 6 y 15 caracteres con al menos una mayúscula, una minúscula y un número";
            };
            if(values.password.length === 0) {
              errors.comparePassword="Debe verificar la contraseña ingresada";
            } else if(values.password !== values.comparePassword) {
              errors.comparePassword="Las constraseñas no coinciden";
            };
            if(values.githubId.length === 0) {
              errors.githubId="Debe ingresar su Usuario de Github";
            } /* else if(!regGithub.data) {
              errors.githubId="Usuario de Github incorrecto";
            };  */
            return errors;
          }}
          onSubmit={(values) => {
            console.log(values, "este es el values de registro");
            dispatch(postUser(values))
            Swal.fire(
              "Registrado",
              "Se ha registrado correctamente en el sistema",
              "success"
            )
            .then(() => window.location.href="/");
          }}
        >
        {({ isSubmitting, isValid }) => (
          <>
            <Form>
            <div className="nombreRegisto">
              <Field
                autoFocus={true}
                type="firstname"
                name="firstname"
                placeholder="Nombre"
              />
              <ErrorMessage name="firstname">
                {(message) => (
                  <div className="Add-Form-Error">{message}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="apellidoRegistro">
              <Field
                type="lastname"
                name="lastname"
                placeholder="Apellido"
              />
              <ErrorMessage name="lastname">
                {(message) => (
                  <div className="Add-Form-Error">{message}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="emailRegistro">
              <Field
                readOnly
                type="email"
                name="email"
                value={estado.email}
              />
            </div>
            <div className="passRegistro">
              <Field
                type="password"
                name="password"
                placeholder="Contraseña"
              />
              <ErrorMessage name="password">
                {(message) => (
                  <div className="Add-Form-Error">{message}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="cpassRegistro">
              <Field
                type="password"
                name="comparePassword"
                placeholder="Repetir Contraseña"
              />
              <ErrorMessage name="comparePassword">
                {(message) => (
                  <div className="Add-Form-Error">{message}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="iconGitRegistro">
              <img src="https://cdn.discordapp.com/attachments/764979688446885898/803751928596004926/GitHubLogo.png" alt=""/>
            </div>
            <div className="gitRegistro">
              <Field
                type="name"
                name="githubId"
                placeholder="GitHubId"
              />
              <ErrorMessage name="githubId">
                {(message) => (
                  <div className="Add-Form-Error">{message}</div>
                )}
              </ErrorMessage>
            </div>
            <div className="btnRegistro">
              <button className="" type="submit"  disabled={isSubmitting || !isValid}>
                Registrarse
              </button>
            </div>
          </Form>
        </>
        )}
        </Formik>
      </div>
    </>
  );
};

export default Registro;
