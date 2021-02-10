import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStadupByUser } from "Store/Actions/Standups";
import { putAsistencia, putParticipa, usersGroup, alumnosGroup } from "Store/Actions/Users";
import Swal from "sweetalert2";
import "./Panel.css";

const url = "http://localhost:3001"


function Panel() {
    const { standup } = useSelector((state: any) => state.Standups);
    const { user, users } = useSelector((state: any) => state.Users);
    const [modulos, setModulos] = useState(new Array);
    const [indice, setIndice] = useState(-1);
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.role) {
            if (user.role !== "PM") {
                Swal.fire(
                    "No autorizado",
                    "Usted no es un usuario autorizado para entrar a esta sección",
                    "error"
                )
                    .then(() => window.location.href = "/")
            }
            axios.get(`${url}/historia/modulos`)
                .then((response: any) => {
                    setModulos(response.data);
                });
            dispatch(getStadupByUser(user._id));
        }
    }, [user])

    useEffect(() => {
        if (standup._id) dispatch(alumnosGroup(standup._id))
    }, [standup])

    function handleSelect(e: any) {
        if (indice > -1) {
            setIndice(-1);
            setTimeout(() => setIndice(e.target.value), 500)
        } else {
            setIndice(e.target.value);
        }
    }

    function handleAsistencia(e: any) {
        const datos = e.target.name.split("/");
        dispatch(putAsistencia(datos[0], { modulo: datos[1], clase: datos[2], valor: e.target.checked }));
    }

    function handleParticipa(e: any) {
        if (e.target.value > 5) {
            e.target.value = 5
        } else if (e.target.value < 0) {
            e.target.value = 0
        } else {
            const datos = e.target.name.split("/");
            dispatch(putParticipa(datos[0], { modulo: datos[1], clase: datos[2], valor: e.target.value }));
        }
    }

    return (
        <div className="Panel-Body">
            <h2>STANDUP {standup && standup.Grupo}</h2>
            <div className="Panel-Sub">
                <div>
                    <h3>A cargo de los PM´s: {standup.PM && standup.PM.length > 0 && standup.PM[0].name.firstname}{" "}
                        {standup.PM && standup.PM.length > 0 && standup.PM[0].name.lastname} y {standup.PM && standup.PM.length > 1 && standup.PM[1].name.firstname}{" "}
                        {standup.PM && standup.PM.length > 1 && standup.PM[1].name.lastname}.</h3>
                </div>
                <div id="black-box">
                    <div> <strong>INDICACIONES:</strong> <br />
                        Marcar la casilla "a" para la asistencia en cada clase. <br /> En la casilla "p" puntuar la participación del 1 al 5. </div>
                    <div> <strong>PROPÓSITO:</strong> <br /> Esto será de ayuda para un reporte de rendimiento individual. <br /> Gracias por la colaboración .</div>
                </div>
                <div>
                    <select id="modulo-select" name="select" onChange={(e) => handleSelect(e)}>
                        <option value={-1}>Seleccione un Módulo</option>
                        <option value={0}>Módulo 1</option>
                        <option value={1}>Módulo 2</option>
                        <option value={2}>Módulo 3</option>
                        <option value={3}>Módulo 4</option>
                    </select>
                </div>
            </div>
            {indice > -1 &&
                <div className="Panel-Table-Container">
                    <table className="Panel-Table">
                        <thead>
                            <tr>
                                <th className="Panel-Sticky">Alumno</th>
                                {modulos[indice].Clases.map((clase: any) =>
                                    <th>{clase.Nombre}<br /></th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((alumno: any) =>
                                <tr>
                                    <td className="Panel-Sticky">
                                        {alumno.name.firstname + " " + alumno.name.lastname}
                                    </td>
                                    {alumno.historia.Modulos[indice].Clases.map((clase: any, index: any) =>
                                        <td>
                                            <input type="checkbox"
                                                name={alumno.historia._id + "/" + indice + "/" + index}
                                                defaultChecked={clase.Asistencia}
                                                onChange={(e) => handleAsistencia(e)}
                                            />
                                        a
                                        <input type="number"
                                                name={alumno.historia._id + "/" + indice + "/" + index}
                                                defaultValue={clase.Participa}
                                                className="Panel-Participa"
                                                onChange={(e) => handleParticipa(e)}
                                            />
                                        p
                                    </td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Panel;