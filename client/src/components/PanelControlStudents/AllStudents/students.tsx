import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./students.css";
import { getStudents } from "../../../Store/Actions/Users";
import SearchBar from "../searchBar"
import { Link } from "react-router-dom";

const Students = (): JSX.Element => {
    const dispatch = useDispatch()
    const users: any = useSelector((state: any) => state.Users.users)

    useEffect(() => {
        dispatch(getStudents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="student-super-container">
            <div id='contenedor-top-estudiantes'>
                <h1 id='titulo-tab-estudiantes'>Mis Estudiantes</h1>
                <SearchBar id='busqueda-estudiantes' />
            </div>
            <div className="student-container">
                <div className="student-titles">
                </div>
                <table className="student-table">
                    <thead className="student-table-titles">
                        <tr id="student-table-tr">
                            <th className="student-table-th">Nombre</th>
                            <th className="student-table-th" id="less">Fecha</th>
                            <th className="student-table-th" >E-mail</th>
                            <th className="student-table-th" >Git-Hub</th>
                            <th className="student-table-th" id="less">Cohorte</th>
                            <th className="student-table-th" id="less">Grupo Standup</th>
                        </tr>
                    </thead>
                    <tbody className="student-table-body">
                        {users && users.length > 0 && users.map((alum: any) => (alum.role !== "instructor") ? (
                            <tr id="student-table-tr">
                                <td className="student-table-td">{`${alum.name.firstname} ${alum.name.lastname}`}</td>
                                <td className="student-table-td" id="less">{alum.created}</td>
                                <td className="student-table-td">{alum.email}</td>
                                <td className="student-table-td">{alum.github}</td>
                                <Link to={`/activos/${alum.cohorte && alum.cohorte._id}`}>
                                    <td className="student-table-td" id="links-table">{alum.cohorte && alum.cohorte.Nombre}</td>
                                </Link>
                                <td className="student-table-td" id="less">{alum.standup && alum.standup.Grupo}</td>
                            </tr>
                        ) : null)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Students;