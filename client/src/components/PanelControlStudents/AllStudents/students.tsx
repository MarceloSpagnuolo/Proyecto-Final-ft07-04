import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./students.css";
import { getStudents } from "../../../Store/Actions/Users";
import SearchBar from "../searchBar"

const Students = (): JSX.Element => {
    const dispatch = useDispatch()
    const users: any = useSelector((state: any) => state.Users.users)

    useEffect(() => {
        dispatch(getStudents())
    }, [])

    return (
        <div className="student-super-container">
            <SearchBar />
            <div className="student-container">
                <div className="student-titles">
                    <h1>Mis Estudiantes</h1>
                    {/* <div className="student-filter">
                        <div className="student-search">
                            <input type="search" name="search-Student" placeholder="Busca un estudiante" className="student-input-search" />
                            <input type="submit" id="student-input-submit" />
                        </div>
                        <select name="cohortes" id="" className="student-selector">
                             ////iterar sobre la cantidad de cohortes MOSTRAR CUANDO FUNCIONE
                            <option value="Ver Todos" selected >Ver Todos</option>
                            <option value="Cohorte 1" className="">Cohorte 1</option>
                            <option value="Cohorte 2" className="">Cohorte 2</option>
                            <option value="Cohorte 3" className="">Cohorte 3</option>
                            <option value="Cohorte 4" className="">Cohorte 4</option>
                        </select>
                    </div> */}
                </div>
                <table className="student-table">
                    <thead className="student-table-titles">
                        <tr id="student-table-tr">
                            <th className="student-table-th">Nombre</th>
                            <th className="student-table-th" id="less">Fecha</th>
                            <th className="student-table-th" >E-mail</th>
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
                                <td className="student-table-td" id="less">{alum.cohorte && alum.cohorte.Nombre}</td>
                                <td className="student-table-td" id="less">{alum.standup && alum.standup.Grupo}</td>
                            </tr>
                        ):null)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Students;