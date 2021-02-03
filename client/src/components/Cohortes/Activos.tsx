import React, { useEffect, useState } from "react";
import "./Activos.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersbyCohorte,
  deleteUserCohorte,
  migrarUserCohorte,
} from "../../Store/Actions/Users";
import Modal from "components/Modal/Modal";
import { getCohorte, putInstructor } from "Store/Actions/Cohortes";
import axios from "axios";
// import { Formik, Field, ErrorMessage, Form } from "formik";
import { Link } from "react-router-dom";

function Activos(props: any) {
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.Users);
  const { cohorte, cohortes } = useSelector((state: any) => state.Cohortes);
  const { id } = props.match.params;
  const [display, setDisplay] = useState(false); //Muestra modal de migracion
  const [disponibles, setDisp] = useState([]);   //Cohortes disponibles
  const [migra, setMigra] = useState({ alumnoId: "", nombre: "" });
  const [nvoCohorte, setCohorte] = useState(""); //Variable para seleccionar un nuevo cohorte al alumno
  const [showInst, setInst] = useState(false);   //Variable para mostrar el modal par asignar instructor
  const [nvoInst, setNvoInst] = useState("");  //Variable para el nuevo Instructor
  const [instDisp, setInstDisp] = useState([]); //Instructores disponibles
  const [inicio, setInicio] = useState(Date.now);
  const [fecha, setFecha] = useState(true);

  useEffect(() => {
    dispatch(getCohorte(id));
    dispatch(getUsersbyCohorte(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cohorte && cohorte.length > 0 && setInicio(cohorte[0].Start);
  }, [cohorte])

  async function handleDel(id: string, nombre: string) {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Está por eliminar a ${nombre} de este Cohorte y quedará sin ningún Cohorte`,
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
    });
  };

  function handleMig(alumnoId: string, nombre: string) {
    setDisp(cohortes.filter((cohorte: any) => cohorte._id !== id));
    setMigra({ alumnoId, nombre });
    setDisplay(true);
  };

  function handleOnchange(e: any) {
    setCohorte(e.target.value);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(migrarUserCohorte(migra.alumnoId, nvoCohorte));
    Swal.fire(
      "Migrado!",
      `${migra.nombre} ha sido migrado al cohorte ${nvoCohorte}.`,
      "success"
    );
    setDisplay(false);
  };

  async function cambiaInst() {
    const instDisp: any = await axios.get("http://localhost:3001/users/disponibles");
    if (instDisp.data.length === 0) {
      Swal.fire(
        "No disponible",
        "No existen instructores disponibles para asignar a este Cohorte",
        "error"
      );
    } else {
      setInstDisp(instDisp.data);
      setInst(true);
    }
  }

  function handleChangeInst(e: any) {
    setNvoInst(e.target.value);
  }

  function handleSubmitInst(e: any) {
    dispatch(putInstructor(id, nvoInst));
    Swal.fire(
      "Asignado!",
      `El Instructor ha sido asignado a este cohorte.`,
      "success"
    );
  }

  function changeInicio(e: any) {
    setInicio(e.target.value);
    setFecha(!fecha);
  }

  return (
    <>
      {/* Migración de Cohorte */}
      <Modal title="Migración de Cohorte" show={display} onClose={() => setDisplay((val) => !val)}>
        <h4>Seleccione el cohorte al que migra {migra.nombre}</h4>
        <form>
          <div className="Listado-Container-Select">
            <select name="select" className="Listado-Select" onChange={(e) => handleOnchange(e)}>
              <option value="">Seleccione un Cohorte</option>
              {disponibles.map((elem: any) => <option value={elem.Nombre}>{elem.Nombre} - Inicio: {elem.Start}</option>)
              }
            </select>
          </div>
          <div className="Modal-Botones">
            <button className="Modal-Cancel" onClick={() => setDisplay(false)}>Cancelar</button>
            <button className="Modal-Migrar" type="submit" onClick={(e) => handleSubmit(e)}
              disabled={!nvoCohorte}>Migrar</button>
          </div>
        </form>
      </Modal>

      {/* Selección de Instructor */}
      <Modal title="Asignación de Instructor al Cohorte" show={showInst} onClose={() => setInst((val) => !val)}>
        <h4>Seleccione el instructor a asignar al cohorte {cohorte && cohorte.length > 0 && cohorte[0].Nombre}</h4>
        <form>
          <div className="Listado-Container-Select">
            <select name="select" className="Listado-Select" onChange={(e) => handleChangeInst(e)}>
              <option value="">Seleccione un Instructor</option>
              {instDisp.map((elem: any) => <option value={elem._id}>{elem.name.firstname + " " + elem.name.lastname}</option>)}
            </select>
          </div>
          <div className="Modal-Botones">
            <button className="Modal-Cancel" onClick={() => setDisplay(false)}>Cancelar</button>
            <button className="Modal-Migrar" type="submit" onClick={(e) => handleSubmitInst(e)}
              disabled={!nvoInst}>Asignar</button>
          </div>
        </form>
      </Modal>
      <div className="Activos-Container">
        <h2>Cohorte Activo</h2>
        <span>Cohorte: {cohorte && cohorte.length > 0 && cohorte[0].Nombre}</span>
        <br />
        <div>
          <span>Inicio: {cohorte && cohorte.length > 0 && cohorte[0].Start}</span>
        </div>
        <br />
        <div>
          <span>Instructor: {cohorte && cohorte.length > 0 && cohorte[0].Instructor !== null &&
            cohorte[0].Instructor.name.firstname + " " + cohorte[0].Instructor.name.lastname}</span>
          <button className="Activos-Boton" onClick={() => cambiaInst()}>Cambiar/Cargar</button>
        </div>
        <br />
        <div>
          <span>Grupos</span>
          <Link to={`/grupos/${id}`}>
          <button className="Activos-Boton">Ir al grupo</button>
          </Link>
        </div>
        <div>
          <span>Alumnos: {users.length}</span>
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
                    return elem.role === "alumno" || elem.role === "PM" ? (
                      <tr id="Listado-Tr">
                        <td className="Listado-Td">
                          {elem.name.firstname + " " + elem.name.lastname}
                        </td>
                        <td className="Listado-Td">{elem.email}</td>
                        <td className="Listado-Td" id="Prueba">
                          {elem.created.substr(8, 2) + "/" + elem.created.substr(5, 2) + "/" + elem.created.substr(0, 4)}
                        </td>
                        <td className="Listado-Td" id="Prueba">
                          {elem.standup && elem.standup.Grupo}
                        </td>
                        <td className="Listado-Td">
                          <button
                            className="Listado-Boton"
                            onClick={() =>
                              handleDel(
                                elem._id,
                                elem.name.firstname + " " + elem.name.lastname
                              )
                            }
                          >
                            Quitar
                        </button>
                        </td>
                        <td className="Listado-Td">
                          <button
                            className="Listado-Boton"
                            onClick={() =>
                              handleMig(
                                elem._id,
                                elem.name.firstname + " " + elem.name.lastname
                              )
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
    </>
  );
}

export default Activos;
