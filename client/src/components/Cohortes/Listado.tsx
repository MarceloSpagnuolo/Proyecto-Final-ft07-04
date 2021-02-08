import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getActiveCohortes } from "Store/Actions/Cohortes";
import "./Listado.css";

function Listado(props: any) {
  const { cohortes } = useSelector((state: any) => state.Cohortes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveCohortes(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.flag]);

  return (
    <div className="Listado-Container">
      <h2>Cohortes Activos</h2>
      <table className="Listado-Table">
        <tbody>
          <tr>
            <th className="Listado-Th">Id</th>
            <th className="Listado-Th">Inicio</th>
            <th className="Listado-Th">Alum</th>
            <th className="Listado-Th">Instructor</th>
          </tr>
          {cohortes &&
            cohortes.length > 0 &&
            cohortes.map((elem: any) => {
              return elem.Active === true ? (
                <tr key={elem._id} id="Listado-Tr">
                  <td className="Listado-Td" id="Listado-Align">
                    {elem.Nombre}
                  </td>
                  <td className="Listado-Td" id="Listado-Align">
                    {elem.Start}
                  </td>
                  <td className="Listado-Td" id="Listado-Align">
                    {elem.Alumnos}
                  </td>
                  <td className="Listado-Td" id="instruct">
                    {!!elem.Instructor && !!elem.Instructor.name && elem.Instructor.name.firstname +
                      " " +
                      elem.Instructor.name.lastname}
                  </td>
                  <td className="Listado-Td">
                    <Link to={`/activos/${elem._id}`}>
                      <button className="Listado-Boton-Detalle-cohorte">Detalle</button>
                    </Link>
                  </td>
                </tr>
              ) : null;
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Listado;
