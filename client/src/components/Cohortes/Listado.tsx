import React from "react";
import { Link } from "react-router-dom";
import "./Listado.css";

function Listado(props: any) {
  return (
    <div className="Listado-Container">
      <h2>Cohortes Activos</h2>
      <table className="Listado-Table">
        <tbody>
          <tr>
            <th className="Listado-Th">Nro</th>
            <th className="Listado-Th">Inicio</th>
            <th className="Listado-Th">Alum</th>
            <th className="Listado-Th">Instructor</th>
          </tr>
          {props.listado.Cohortes.cohortes.length > 0 && props.listado.Cohortes.cohortes.map((elem: any) => {
            return  (elem.Active === true) ?(
              <tr key={elem._id} id="Listado-Tr">
                <td className="Listado-Td" id="Listado-Align">
                  {elem._id}
                </td>
                <td className="Listado-Td" id="Listado-Align">
                  {elem.Start}
                </td>
                <td className="Listado-Td" id="Listado-Align">
                  {elem.Alumnos}
                </td>
                <td className="Listado-Td">{elem.Instructor[0].User}</td>
                <td className="Listado-Td">
                  <Link to={`/activos/${elem._id}`}>
                    <button className="Listado-Boton">Detalle</button>
                  </Link>
                </td>
              </tr>
            ):null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Listado;
