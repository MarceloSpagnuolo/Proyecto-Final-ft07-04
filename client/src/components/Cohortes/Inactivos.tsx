import React, { useEffect } from "react";
import "./Activos.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsersbyCohorte } from "../../Store/Actions/Users";
import { getCohorte } from "Store/Actions/Cohortes";
import SearchBar from "../PanelControlStudents/searchBar"
import './inactivos.css'

function Inactivos(props: any) {
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.Users);
  const { cohorte } = useSelector((state: any) => state.Cohortes);
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getCohorte(id));
    dispatch(getUsersbyCohorte(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="container-inactivos-total">
        <div id="container-inactivos">
          <h2 id='titulo-cohorte-inactivo'>Cohorte Inactivo</h2>
          <hr></hr>
          <br></br>
          <p>Cohorte: {cohorte && cohorte.length > 0 && cohorte[0].Nombre}</p>

          <div>
            <p>Inicio: {cohorte && cohorte.length > 0 && cohorte[0].Start}</p>
          </div>

          <div>
            <p>Instructor: {cohorte && cohorte.length > 0 && cohorte[0].Instructor !== null &&
              cohorte[0].Instructor.name.firstname + " " + cohorte[0].Instructor.name.lastname}</p>
          </div>

          <div>
            <p>Alumnos: {users.length}</p>
          </div>
          <div className="Listado-Container">
            <h3>Alumnos</h3>
            <div>
              <SearchBar id={id} />
            </div>
            <br />
            <div className="Activos-Table">
              <table className="Activos-Table">
                <tbody>
                  <tr>
                    <th className="Listado-Th">Nombre</th>
                    <th className="Listado-Th">Email</th>
                    <th className="Listado-Th" id="Prueba">
                      Alta
                </th>
                    <th className="Listado-Th" id="Prueba">
                      StandUp
                </th>
                  </tr>

                  {users.length > 0 &&
                    users.map((elem: any) => {
                      return elem.role === "alumno" || elem.role === "PM" ? (
                        <tr id="Listado-Tr">
                          <td id="instruct" className="Listado-Td">
                            {elem.name.firstname + " " + elem.name.lastname}
                          </td>
                          <td id="instruct" className="Listado-Td">{elem.email}</td>
                          <td className="Listado-Td" id="Prueba">
                            {elem.created.substr(8, 2) + "/" + elem.created.substr(5, 2) + "/" + elem.created.substr(0, 4)}
                          </td>
                          <td className="Listado-Td" id="Prueba">
                            {!!elem.standup && elem.standup.Grupo}
                          </td>
                        </tr>
                      ) : null;
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Inactivos;
