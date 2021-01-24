import React from "react";
import "./students.css";


const Students = (): JSX.Element => {

    return (
        <div className="student-super-container">
            <div className="student-container">
                <div className="student-titles">
                    <h1>Mis Estudiantes</h1>
                    <div className="student-filter">
                        <div className="student-search">
                            <input type="search" name="search-Student" placeholder="Busca un estudiante" className="" />
                            <input type="submit" className="" />
                        </div>
                        <select name="cohortes" id="" className="student-cohortes">
                            {/* iterar sobre la cantidad de cohortes */}
                            <option value="Ver Todos" selected className="">Ver Todos</option>
                            <option value="Cohorte 1" className="">Cohorte 1</option>
                            <option value="Cohorte 2" className="">Cohorte 2</option>
                            <option value="Cohorte 3" className="">Cohorte 3</option>
                            <option value="Cohorte 4" className="">Cohorte 4</option>
                        </select>
                    </div>
                </div>
                <table className="student-table">
                    <thead className="student-table-titles">
                        <tr className="student-table-fila">
                            <th className="">Nombre y Apellido</th>
                            <th className="">Fecha de Registro</th>
                            <th className="">E-mail</th>
                            <th className="">Cohorte</th>
                            <th className="">Grupo Standup</th>
                        </tr>
                    </thead>
                    <tbody className="student-table-body">
                        {/* iterar sobre cada usuario */}
                        <tr className="student-table-fila">
                            <td className="">nombre</td>
                            <td className="">fecha registro</td>
                            <td className="">email</td>
                            <td className="">cohorte</td>
                            <td className="">Grupo Standup</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Students;