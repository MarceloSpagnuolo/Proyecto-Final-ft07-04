import React, { useEffect } from "react";
import "./Activos.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersbyCohorte,
  deleteUserCohorte,
  migrarUserCohorte,
} from "../../Store/Actions/Users";

function Activos(props: any) {
  const dispatch = useDispatch();
  const state: any = useSelector((state) => state);
  const users = state.Users.users;
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getUsersbyCohorte(id));
  }, []);

  function handleDel(id: string, nombre: string) {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Está por eliminar a ${nombre} de este Cohorte`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUserCohorte(id));
        Swal.fire(
          "Eliminado!",
          `${nombre} no pertenece más a este Cohorte.`,
          "success"
        );
      }
      //dispatch(getUsersbyCohorte(props.match.params.id))
    });
  }

  function handleMig(id: string, nombre: string) {
    Swal.fire({
      title: `Ingrese al cohorte que migra ${nombre}`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Migrar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(migrarUserCohorte(id, result.value));
        Swal.fire(
          "Migrado!",
          `${nombre} ha sido migrad@ al cohorte ${result.value}`,
          "success"
        );
      }
      dispatch(getUsersbyCohorte(props.match.params.id));
    });
  }

  return (
    <div className="Activos-Container">
      <h2>Cohorte Activo</h2>
      <span>Cohorte: {id}</span>
      <br />
      {/* <div>
        <span>Inicio:</span>
        <button className="Activos-Boton">Cambiar</button>
      </div>
      <br />
      <div>
        <span>Instructor:</span>
        <button className="Activos-Boton">Cambiar/Cargar</button>
      </div>
      <br /> */}
      <div>
        <span>Alumnos: {users.length - 1}</span>
      </div>
      <div className="Listado-Container">
        <h3>Alumnos</h3>
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
                  return elem.role === "alumno" ? (
                    <tr id="Listado-Tr">
                      <td className="Listado-Td">
                        {elem.name.firstname + " " + elem.name.lastname}
                      </td>
                      <td className="Listado-Td">{elem.email}</td>
                      <td className="Listado-Td" id="Prueba">
                        {elem.created}
                      </td>
                      <td className="Listado-Td" id="Prueba">
                        {elem.standup}
                      </td>
                      <td className="Listado-Td">
                        <button
                          className="Listado-Boton"
                          onClick={() =>
                            handleDel(elem._id, elem.name.firstname)
                          }
                        >
                          Quitar
                        </button>
                      </td>
                      <td className="Listado-Td">
                        <button
                          className="Listado-Boton"
                          onClick={() =>
                            handleMig(elem._id, elem.name.firstname)
                          }
                        >
                          Migrar
                        </button>
                      </td>
                    </tr>
                  ) : null;
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activos;
