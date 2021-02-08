import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import "./Add.css";
import Swal from "sweetalert2";
import { postCohorte } from "../../Store/Actions/Cohortes"
import { useDispatch } from "react-redux";
import axios from "axios";

interface AddForm {
  Nombre: String;
  fechaInicio: Date;
}

const url = "http://localhost:3001"

function Add() {

  const dispatch = useDispatch()
  const initialValues: AddForm = {
    Nombre: "",
    fechaInicio: new Date("    /  /  "),
  };

  return (
    <>
      <div className="Add-Body">
        <div className="Add-Form-Body">
          <Formik
            initialValues={initialValues}
            validate={async (values) => {
              var errors: { [k: string]: any } = {};
              const regDate = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(values.fechaInicio.toString())
              const regNombre = values.Nombre.length > 0 ? await axios.get(`${url}/cohorte/nombre/${values.Nombre}`) : { data: false };
              let hoy: Date = new Date();
              if (values.Nombre.length < 1) {
                errors.Nombre = "Debe Ingresar el nombre del Cohorte";
              } else if (regNombre.data) {
                errors.Nombre = "Ese nombre ya existe"
              }
              if (!values.fechaInicio) {
                errors.fechaInicio = "Debe Ingresar una fecha válida";
              } else if (!regDate) {
                errors.fechaInicio = "Fecha inválida"
              } else if (new Date(values.fechaInicio) < hoy) {
                errors.fechaInicio = "La fecha no puede ser inferior a hoy"
              }
              return errors;
            }}

            onSubmit={(values) => {
              dispatch(postCohorte(values));
              Swal.fire(
                "Listo",
                "Hemos generado su cohorte con exito",
                "success"
              )
            }}
          >
            {({ isSubmitting, isValid }) => (
              <>
                <div className="Add-Cohorte-Body">
                  <h2 className="Add-Cohorte-Title">Crea Un Nuevo Cohorte</h2>
                  <p className="Add-Frase">
                    Agrega a la base de datos a los nuevos integrantes de HENRY.
                  </p>
                  <Form className="Add-Form">
                    <div className="Add-Form-Campos">
                      <label htmlFor="Add" className="Add-Form-Label">
                        * Próximo Cohorte
                      </label>
                      <br />
                      <Field
                        className="Add-Form-Input-Cohorte"
                        type="text"
                        name="Nombre"
                        autoFocus="true"
                      />
                      <ErrorMessage name="Nombre">
                        {(message) => (
                          <div className="Add-Form-Error">{message}</div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="Add-Form-Campos">
                      <label htmlFor="Add" className="Add-Form-Label">
                        * Fecha de Inicio
                      </label>
                      <br />
                      <Field
                        className="Add-Form-Input-Fecha"
                        type="date"
                        name="fechaInicio"
                      />
                      <ErrorMessage name="fechaInicio">
                        {(message) => (
                          <div className="Add-Form-Error">{message}</div>
                        )}
                      </ErrorMessage>
                    </div>
                    <span id='campos-obligatorios-nuevo-cohorte'>* Campos obligatorios</span>
                    <br />
                    <button
                      type="submit"
                      className={`submit ${isSubmitting || !isValid ? "disabled" : "enabled"
                        }`}
                      id="Add-Btn-Submit"
                      disabled={isSubmitting || !isValid}
                    >
                      Generar Cohorte
                    </button>
                  </Form>
                </div>
              </>
            )}
          </Formik>
        </div>
        <div className="Add-Image">
          <img
            src="https://cdn.discordapp.com/attachments/801584401611620383/802716856850972683/undraw_group_chat_v059.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Add;
