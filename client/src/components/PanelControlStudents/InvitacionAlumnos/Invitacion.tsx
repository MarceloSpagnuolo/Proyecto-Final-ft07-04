import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Invitacion.css';
import { sendInvitation } from '../../../Store/Actions/Users';

const Invitacion = (): JSX.Element => {

    const dispatch = useDispatch();
    const [invitation, setInvi] = useState({})

    function handleOnChange(e: any): void {
        setInvi({
            ...invitation,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(): void {
        console.log(invitation, "soy el submit");
        dispatch(sendInvitation(invitation))
    }

    return (
        <div id="super-invitation">

            <h1>Invita nuevos alumnos</h1>
            <div className="container-invitation-students">
                <div>
                    <table>
                        <thead>
                            <tr id="recibe">
                                <input name="file" type="file" id="file" onChange={(e) => handleOnChange(e)} />
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