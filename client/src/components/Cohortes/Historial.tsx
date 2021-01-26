import React from "react";
import "./Listado.css";
const cohortes = [
  {
    nro: 1,
    fecha: "01/01/2020",
    alumnos: 150,
    instructor: "Pepito Flores",
  },
  {
    nro: 2,
    fecha: "01/02/2020",
    alumnos: 165,
    instructor: "Esteban Quito",
  },
  {
    nro: 3,
    fecha: "01/03/2020",
    alumnos: 177,
    instructor: "Esteban Dido",
  },
  {
    nro: 4,
    fecha: "01/04/2020",
    alumnos: 168,
    instructor: "Bill Gates",
  },
  {
    nro: 5,
    fecha: "01/05/2020",
    alumnos: 175,
    instructor: "Manolo Arias",
  },
  {
    nro: 6,
    fecha: "01/07/2020",
    alumnos: 190,
    instructor: "Pedro Marmol",
  },
];

function Historial() {
  return (
    <div className="Listado-Container">
      <h2>Cohortes Finalizados</h2>
      <table className="Listado-Table">
        <tbody>
          <tr>
            <th className="Listado-Th">Nro</th>
            <th className="Listado-Th">Inicio</th>
            <th className="Listado-Th">Alum</th>
            <th className="Listado-Th">Instructor</th>
            <th></th>
          </tr>
          {cohortes.map((elem) => {
            return (
              <tr key={elem.nro} id="Listado-Tr">
                <td className="Listado-Td" id="Listado-Align">
                  {elem.nro}
                </td>
                <td className="Listado-Td" id="Listado-Align">
                  {elem.fecha}
                </td>
                <td className="Listado-Td" id="Listado-Align">
                  {elem.alumnos}
                </td>
                <td className="Listado-Td">{elem.instructor}</td>
                <td className="Listado-Td">
                  <button className="Listado-Boton">Detalle</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Historial;
