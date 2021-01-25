import React from 'react';
import './Invitacion.css';

const Invitacion = (): JSX.Element => {

    return (
        <div id="super-invitation">

            <h1>Invita nuevos alumnos</h1>
            <div className="container-invitation-students">
                <div>
                    <table>
                        <thead>
                            <tr id="recibe">
                                <input type="file" id="file" />
                                <input type="email" placeholder="correo@nuevo.alumno" id="email" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr><input type="text" id="cuerpo" placeholder=" Mensaje de invitación." /></tr>
                        </tbody>
                    </table>
                </div>
                <div id="submit">
                    <input type="submit" />
                </div>
            </div>
        </div>
    )
}

export default Invitacion;