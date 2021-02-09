  
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import {newPassReturn} from "../../Store/Actions/Users"
import "./ResetPassEmail.css";
import Swal from "sweetalert2";

const ResetPassEmail = () => {
    const [mailTok, setMail] = useState(useLocation().search)
    const dispatch = useDispatch();
    const user: any = useSelector((state: any) => state.Users.user);

    useEffect(() => {
        if (mailTok.includes("reset")) {
            setMail(mailTok.split("=")[1])
        }
    }, [])


    return (
        <div className="Return-Container">
            <div className="Return-Content">
                <h2>RESTABLECER CONTRASEÑA</h2>
                <div>
                    <p>Bienvenido nuevamente, vamos a restablecer su contraseña</p>
                    <br /><br />
                </div>
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: "",
                    }}
                    validate={(values) => {
                        const errors: any = {};
                        
                        if (!values.password) {
                            errors.password = "Debe ingresar su contraseña";
                        }
                        if (values.password !== values.confirmPassword) {
                            errors.confirmPassword = "Las contraseñas no coinciden";
                        }

                        return errors;
                    }}
                    onSubmit={(values) => {
                        //se despacha la accion para resetear la contraseña con el toquen recibido del mail
                        dispatch(newPassReturn(mailTok, values))
                        Swal.fire({
                            icon: 'success',
                            title: 'Contraseña Cambiada!',
                            text: "Será logueado automáticamente con la nueva contraseña",
                            showConfirmButton: false,
                            timer: 2900
                          })
                        setTimeout(() => {window.location.href = "/"}, 3005)
                    }}>
                    {({ isSubmitting, isValid }) => (
                        <>
                            <Form className="Registro-Form" autoComplete="off">
                                <div>
                                    <label htmlFor="Registro">
                                        Nueva Contraseña:
                                    </label>
                                    <br></br>
                                    <Field
                                        className="Registro-Form-Input"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                    />
                                    <ErrorMessage name="password">
                                        {(message) => (
                                            <div className="Registro-Form-Error">{message}</div>
                                        )}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="Registro">
                                        Confirmar Contraseña:
                                     </label>
                                    <br></br>
                                    <Field
                                        className="Registro-Form-Input"
                                        name="confirmPassword"
                                        type="password"
                                    />
                                    <ErrorMessage name="confirmPassword">
                                        {(message) => (
                                            <div className="Registro-Form-Error">{message}</div>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <button
                                    type="submit"
                                    className="Return-btn"
                                    id="Registro-Btn-Submit"
                                    disabled={!isSubmitting && !isValid}
                                >
                                    Actualizar Contraseña
                                </button>
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
}
export default ResetPassEmail;