import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import "./Add.css";
import {postCohorte} from "../../Store/Actions/Cohortes"
import {  useDispatch, useSelector } from "react-redux";

interface AddForm {
  nroCohorte: Number;
  fechaInicio: Date;
}

function Add() {
  const dispatch = useDispatch()
  const initialValues: AddForm = {
    nroCohorte: 0,
    fechaInicio: new Date(),
  };

  return (
    <>
      <div className="Add-Body">
        <div className="Add-Form-Body">
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              var errors: { [k: string]: any } = {};
              if (values.nroCohorte < 1)
                errors.nroCohorte = "Debe Ingresar Nro de Cohorte";
              if (!values.fechaInicio)
                errors.fechaInicio = "Debe Ingresar una fecha válida";

              return errors;
            }}
            onSubmit={(values) => {dispatch(postCohorte(values))}}
          >
            {({ isSubmitting, isValid }) => (
              <>
                <div className="Add-Cohorte-Body">
                  <h2 className="Add-Cohorte-Title">Nuevo Cohorte</h2>
                  <p className="Add-Frase">
                    Acá iba a poner una frase super importante y reboluda pero
                    no se me ocurrió nada. Asi que solamente voy a decir gracias
                    por ponerse a leer esta pelotudez
                  </p>
                  <Form className="Add-Form">
                    <div className="Add-Form-Campos">
                      <label htmlFor="Add" className="Add-Form-Label">
                        Nro. Cohorte*
                      </label>
                      <br />
                      <Field
                        className="Add-Form-Input-Cohorte"
                        type="number"
                        name="nroCohorte"
                      />
                      <ErrorMessage name="nroCohorte">
                        {(message) => (
                          <div className="Add-Form-Error">{message}</div>
                        )}
                      </ErrorMessage>
                    </div>
                    <div className="Add-Form-Campos">
                      <label htmlFor="Add" className="Add-From-Label">
                        Fecha de Inicio*
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
                    <span>* Campos obligatorios</span>
                    <br />
                    <button
                      type="submit"
                      className={`submit ${
                        isSubmitting || !isValid ? "disabled" : "enabled"
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
