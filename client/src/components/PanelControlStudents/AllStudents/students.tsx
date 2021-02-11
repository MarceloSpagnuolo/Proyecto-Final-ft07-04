import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./students.css";
import { getStudents, postCohorteToUser } from "../../../Store/Actions/Users";
import { getActiveCohortes } from "Store/Actions/Cohortes";
import SearchBar from "../searchBar"
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
import Swal from "sweetalert2";
import axios from "axios";

const url = "http://localhost:3001";

const Students = (): JSX.Element => {
    const dispatch = useDispatch();
    const users: any = useSelector((state: any) => state.Users.users);
    const { cohortes } = useSelector((state: any) => state.Cohortes);
    const [see, setSee] = useState(false); //bandera para mostrar el modal para asignar cohorte o no
    const [nvoCohorte, setCohorte] = useState<any>({}); //guardo el nombre del nuevo cohorte
    const [alumnoSelect, setAlum] = useState<any>({});  //guardo el objeto del alumno seleccionado
    const [flag, setFlag] = useState(false);    //bandera para ejecutar el dispatch luego de la asignacion

    useEffect(() => {
        dispatch(getStudents("all"))
        dispatch(getActiveCohortes(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flag])

    function handleOnchange(e: any) {   //funcion que escucha el selector del cohorte a asignar
        setCohorte({ nvoCohorte: e.target.value }); //seteo la variable con ese valor
    };

    async function handleSubmit(e: any) { //funcion para ejecutar la asignacion de cohorte
        e.preventDefault();
        if (alumnoSelect) {
            dispatch(postCohorteToUser(alumnoSelect, nvoCohorte))
            await axios.post(`${url}/historia`, { userId: alumnoSelect._id, cohorteId: nvoCohorte });
            Swal.fire(
                "Asignado!",
                `${alumnoSelect.name.firstname} ${alumnoSelect.name.lastname} se le há asignado el cohorte ${nvoCohorte.nvoCohorte}.`,
                "success"
            );
        }
        setFlag(!flag)
        setSee(false);
    };

    function handleStudents(alum: Object) {
        setAlum(alum)
        setSee(true)
    }



    return (
        <>
            <Modal title="Asignar Cohorte" show={see} onClose={() => setSee((val) => !val)}>
                <h4>Seleccione el cohorte a asignar para {alumnoSelect.name &&
                    `${alumnoSelect.name.firstname} ${alumnoSelect.name.lastname}`}</h4>
                <form>
                    <div className="Listado-Container-Select">
                        <select name="select" className="Listado-Select" onChange={(e) => handleOnchange(e)}>
                            <option value="">Seleccionar Cohorte</option>
                            {cohortes && cohortes.length > 0 &&
                                cohortes.map((ch: any) => <option value={ch._id}>{ch.Nombre} - Inicio: {ch.Start}</option>)}
                        </select>
                    </div>
                    <div className="Modal-Botones">
                        <button className="Modal-Cancel" onClick={() => setSee(false)}>Cancelar</button>
                        <button className="Modal-Migrar" type="submit" onClick={(e) => handleSubmit(e)}
                            disabled={!nvoCohorte}>Asignar</button>
                    </div>
                </form>
            </Modal>
        <div id="student-super-container">
            <div id='contenedor-top-estudiantes'>
                <h2 id='titulo-tab-estudiantes'>Alumnos</h2>
                <SearchBar id={"todos"} />
            </div>
            <div className="student-container">
                <div className="student-titles">

                    </div>
                    <table className="student-table">
                        <thead className="student-table-titles">
                            <tr id="student-table-tr">
                                <th className="student-table-th" id="less">Nombre</th>
                                <th className="student-table-th" id="less">Fecha</th>
                                <th className="student-table-th" >Email</th>
                                <th className="student-table-th" id="less">Git-Hub</th>
                                <th className="student-table-th" >Cohorte</th>
                                <th className="student-table-th" id="less">Grupo Standup</th>
                            </tr>
                        </thead>
                        <tbody className="student-table-body">
                            {users && users.length > 0 && users.map((alum: any) => (alum.role !== "instructor") ? (
                                <tr id="student-table-tr">
                                    <td className="student-table-td" id="less"><Link id="links" to={`/profile/${alum._id}`}> {`${alum.name.firstname} ${alum.name.lastname}`}</Link></td>
                                    <td className="student-table-td" id="less">{alum.created}</td>
                                    <td className="student-table-td">{alum.email}</td>
                                    <td className="student-table-td" id="less">
                                        <a id="links" target="_blank" href={`https://github.com/${alum.github}`}>
                                        {alum.github}
                                        </a>
                                    </td>
                                    <td className="student-table-td" id="links-table">
                                        {alum.cohorte ?
                                            <Link id="links" to={`/activos/${alum.cohorte && alum.cohorte._id}`}>
                                                {alum.cohorte && alum.cohorte.Nombre}
                                            </Link>
                                            : <button className="" onClick={() => handleStudents(alum)} >
                                                Asignar
                                                </button>}
                                    </td>
                                    <td className="student-table-td" id="less">{alum.standup && alum.standup.Grupo}</td>
                                </tr>
                            ) : null)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Students;