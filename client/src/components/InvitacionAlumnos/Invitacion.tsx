import React from 'react';
import './Invitacion.css';

const Invitacion = (): JSX.Element => {


    return (
        <div id="super">
            <h1>Panel de Control de Alumnos</h1>
            <h2>Invita nuevos alumnos</h2>
            <div className="container">
                <div id="tittle">
                    <h3>Este es tu panel de control de alumnos, desde aqui podras gestionar los alumnos tanto nuevos como ya inscritos. para añadir un nuevo alumno es muy fácil:</h3>
                </div>
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