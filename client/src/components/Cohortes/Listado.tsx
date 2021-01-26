import React from "react";
import { Link } from "react-router-dom";
import "./Listado.css";

const cohortes = [
  {
    nro: 7,
    fecha: "01/08/2020",
    alumnos: 200,
    instructor: "Bart Simpsons",
  },
  {
    nro: 8,
    fecha: "01/09/2020",
    alumnos: 198,
    instructor: "Fulano Detal",
  },
  {
    nro: 9,
    fecha: "01/10/2020",
    alumnos: 199,
    instructor: "La Mona Gimenez",
  },
];

function Listado() {
  return (
    <div className="Listado-Container">
      <h2>Cohortes Activos</h2>
      <table className="Listado-Table">
        <tbody>
          <tr>
            <th className="Listado-Th">Cohte</th>
            <th className="Listado-Th">Inicio</th>
            <th className="Listado-Th">Alum</th>
            <th className="Listado-Th">Instructor</th>
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
                  <Link to={`/activos/${elem.nro}`}>
                    <button className="Listado-Boton">Detalle</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Listado;
