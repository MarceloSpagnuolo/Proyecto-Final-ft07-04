import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Invitacion.css';
import { sendInvitation } from '../../../Store/Actions/Users';
import Swal from "sweetalert2";

interface inv {
    file?: any;
    email?: string;
    msj?: string;
}

const Invitacion = (): JSX.Element => {

    const dispatch = useDispatch();
    const [invitation, setInvi] = useState<inv>({})

    function handleOnChange(e: any): void {
        if (e.target.name !== "file") {
            setInvi({
                ...invitation,
                [e.target.name]: e.target.value,
            })
        } else {
            setInvi({
                ...invitation,
                [e.target.name]: e.target.files,
            })
        }

    }

    function handleSubmit(): any {
        if (invitation.file || invitation.email) {
            dispatch(sendInvitation(invitation))
            Swal.fire(
                "Listo",
                "Sus emails han sido enviados con éxito",
                "success"
            )
        } else {
            Swal.fire(
                "Error",
                "Por favor, debe ingresar un email",
                "error"
            )
        }

    }

    return (
        <div id="super-invitation">

            <h1>Invita nuevos alumnos</h1>
            <div className="container-invitation-students">
                <div>
                    <table>
                        <thead>
                            <tr id="recibe">
                                <input name="file" type="file" id="file" onChange={(e) => handleOnChange(e)} accept="png jpg jpeg gif xlsx" />
                                <input name="email" type="email" placeholder="correo@nuevo.alumno" id="email"
                                    onChange={(e) => handleOnChange(e)} />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <input name="msj" type="text" id="cuerpo" placeholder=" Mensaje de invitación."
                                    onChange={(e) => handleOnChange(e)} />
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="submit">
                    <input type="submit" onClick={() => handleSubmit()} />
                </div>
            </div>
        </div>
    )
}

export default Invitacion;