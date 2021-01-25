import React from "react";
import "./students.css";
import estudiantes from "./mocks";

const Students = (): JSX.Element => {

    return (
        <div className="student-super-container">
            <div className="student-container">
                <div className="student-titles">
                    <h1>Mis Estudiantes</h1>
                    <div className="student-filter">
                        <div className="student-search">
                            <input type="search" name="search-Student" placeholder="Busca un estudiante" className="student-input-search" />
                            <input type="submit" id="student-input-submit" />
                        </div>
                        <select name="cohortes" id="" className="student-selector">
                            {/* iterar sobre la cantidad de cohortes */}
                            <option value="Ver Todos" selected >Ver Todos</option>
                            <option value="Cohorte 1" className="">Cohorte 1</option>
                            <option value="Cohorte 2" className="">Cohorte 2</option>
                            <option value="Cohorte 3" className="">Cohorte 3</option>
                            <option value="Cohorte 4" className="">Cohorte 4</option>
                        </select>
                    </div>
                </div>
                <table className="student-table">
                    <thead className="student-table-titles">
                        <tr id="student-table-tr">
                            <th className="student-table-th">Nombre y Apellido</th>
                            <th className="student-table-th">Fecha de Registro</th>
                            <th className="student-table-th">E-mail</th>
                            <th className="student-table-th">Cohorte</th>
                            <th className="student-table-th">Grupo Standup</th>
                        </tr>
                    </thead>
                    <tbody className="student-table-body">
                        {estudiantes && estudiantes.length > 0 && estudiantes.map((alum) => (
                            <tr id="student-table-tr">
                                <td className="student-table-td">{alum.name}</td>
                                <td className="student-table-td">{alum.dateRegistro}</td>
                                <td className="student-table-td">{alum.email}</td>
                                <td className="student-table-td">{alum.cohorte}</td>
                                <td className="student-table-td">{alum.standUp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Students;