import React, { useEffect} from "react";
import "./MiCohorte.css";
import { useDispatch, useSelector } from "react-redux";
import {  getUsersbyCohorte } from "../../Store/Actions/Users";
import { getCohorte } from "Store/Actions/Cohortes";
import SearchBar from "../PanelControlStudents/searchBar"

function MiCohorte(props: any) {
  const dispatch = useDispatch();
  const { users, user } = useSelector((state: any) => state.Users);
  const { cohorte } = useSelector((state: any) => state.Cohortes);
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getCohorte(id));
    dispatch(getUsersbyCohorte(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(user.cohorte && user.cohorte._id !== id) {
      window.location.href = "/home"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.cohorte]);


  return (
  <>
      <div className="MiCohorte-Container">
        <h2>Mi Cohorte</h2>
        <span>Cohorte: {cohorte && cohorte.length > 0 && cohorte[0].Nombre}</span>
        <br />
        <div>
          <span>Inicio: {cohorte && cohorte.length > 0 && cohorte[0].Start}</span>
        </div>
        <br />
        <div>
          <span>Instructor: {cohorte && cohorte.length > 0 && cohorte[0].Instructor !== null &&
            cohorte[0].Instructor.name.firstname + " " + cohorte[0].Instructor.name.lastname}</span>
        </div>
        <br />
        <div>
          <span>Alumnos: {users.length}</span>
        </div>
        <div>
            <SearchBar id={id}/>
        </div>
        <div className="MiCohorte-Container">
          <h3>Alumnos</h3>
          <div className="MiCohorte-Table">
            <table className="MiCohorte-Table">
              <tbody>
                <tr>
                  <th className="Listado-Th">Nombre</th>
                  <th className="Listado-Th">Email</th>
                  <th className="Listado-Th" id="Prueba22">
                    Alta
                </th>
                  <th className="Listado-Th" id="Prueba22">
                    Github
                </th>
                </tr>

                {users.length > 0 &&
                  users.map((elem: any) => {
                    return elem.role === "alumno" || elem.role === "PM" ? (
                      <tr id="Listado-Tr">
                        <td className="Listado-Td">
                          {elem.name.firstname + " " + elem.name.lastname}
                        </td>
                        <td className="Listado-Td">{elem.email}</td>
                        <td className="Listado-Td" id="Prueba22">
                          {elem.created.substr(8, 2) + "/" + elem.created.substr(5, 2) + "/" + elem.created.substr(0, 4)}
                        </td>
                        <td className="Listado-Td" id="Prueba22">
                          {elem.github}
                        </td>                        
                      </tr>
                    ) : null;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MiCohorte;