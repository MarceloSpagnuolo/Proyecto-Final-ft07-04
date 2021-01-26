import React from 'react';
import './Invitacion.css';

const Invitacion = (): JSX.Element => {

    function handleSubmit(e: any): void {
        console.log(e.target.value);
    }

    return (
        <div id="super-invitation">

            <h1>Invita nuevos alumnos</h1>
            <div className="container-invitation-students">
                <div>
                    <table>
                        <thead>
                            <tr id="recibe">
                                <input name="file" type="file" id="file" />
                                <input name="email" type="email" placeholder="correo@nuevo.alumno" id="email" />
                            </tr>
                        </thead>
                        <tbody>
                            <tr><input name="text" type="text" id="cuerpo" placeholder=" Mensaje de invitación." /></tr>
                        </tbody>
                    </table>
                </div>
                <div id="submit">
                    <input type="submit" onClick={(e) => handleSubmit(e)} />
                </div>
            </div>
        </div>
    )
}

export default Invitacion;