import React from "react";
import "./Activos.css";
import Swal from "sweetalert2";

const Alumnos = [
  {
    id: 1,
    nombre: "Juan Perez",
    email: "juan@perez.com",
    alta: "01/01/2020",
    grupo: 1,
  },
  {
    id: 2,
    nombre: "Pedro Perez",
    email: "pedro@perez.com",
    alta: "01/01/2020",
    grupo: 1,
  },
  {
    id: 3,
    nombre: "Marcela Perez",
    email: "marcela@perez.com",
    alta: "01/01/2020",
    grupo: 1,
  },
  {
    id: 4,
    nombre: "Dolores Depanza",
    email: "dolores@depanza.com",
    alta: "01/01/2020",
    grupo: 1,
  },
  {
    id: 5,
    nombre: "Mokana Lopez",
    email: "mokana@lopez.com",
    alta: "01/01/2020",
    grupo: 1,
  },
  {
    id: 6,
    nombre: "Madonna Santa",
    email: "madonma@santa.com",
    alta: "01/01/2020",
    grupo: 2,
  },
  {
    id: 7,
    nombre: "Jesus Nazareno",
    email: "jesus@nazareno.com",
    alta: "01/01/2020",
    grupo: 2,
  },
];

function Activos(props: any) {
  const { id } = props.match.params;

  function handleDel(id: number, nombre: string) {
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
        Swal.fire(
          "Eliminado!",
          `${nombre} no pertenece más a este Cohorte.`,
          "success"
        );
      }
    });
  }

  function handleMig(id: number, nombre: string) {
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
        Swal.fire(
          "Migrado!",
          `${nombre} ha sido migrad@ al cohorte ${result.value}`,
          "success"
        );
      }
    });
  }

  return (
    <div className="Activos-Container">
      <h2>Cohorte Activo</h2>
      <span>Cohorte: {id}</span>
      <br />
      <div>
        <span>Inicio:</span>
        <button className="Activos-Boton">Cambiar</button>
      </div>
      <br />
      <div>
        <span>Instructor:</span>
        <button className="Activos-Boton">Cambiar/Cargar</button>
      </div>
      <br />
      <div>
        <span>Alumnos: 200</span>
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
              {Alumnos.map((elem) => {
                return (
                  <tr id="Listado-Tr">
                    <td className="Listado-Td">{elem.nombre}</td>
                    <td className="Listado-Td">{elem.email}</td>
                    <td className="Listado-Td" id="Prueba">
                      {elem.alta}
                    </td>
                    <td className="Listado-Td" id="Prueba">
                      {elem.grupo}
                    </td>
                    <td className="Listado-Td">
                      <button
                        className="Listado-Boton"
                        onClick={() => handleDel(elem.id, elem.nombre)}
                      >
                        Quitar
                      </button>
                    </td>
                    <td className="Listado-Td">
                      <button
                        className="Listado-Boton"
                        onClick={() => handleMig(elem.id, elem.nombre)}
                      >
                        Migrar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activos;
