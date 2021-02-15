import React, { useEffect, useState } from "react";
import "./MiCohorte.css";
import { useSelector, useDispatch } from "react-redux";
import "./rendimiento.css";
import { getStudents } from "Store/Actions/Users";
import { cohortesNames } from "Store/Actions/Cohortes";
import EstadisticaUser from "../Estadisticas/EstadisitcaAlmun";


function Rendimiento(props: any) {
  const dispatch = useDispatch();
  const { user, users } = useSelector((state: any) => state.Users);
  const { cohortes } = useSelector((state: any) => state.Cohortes);
  const { id } = props.match.params;

  useEffect(() => {
    if (user._id && user._id !== id) {
      window.location.href = "/home"
    } else if (!!user._id) {
      dispatch(getStudents(user._id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  useEffect(() => {
    if (!!users && !!users.historia && users.historia.Checkpoints.lenght !== 0) {
      users.historia.Checkpoints.map((c: any) => {
        dispatch(cohortesNames(c.Cohorte))
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.historia]);

  function getNombre(id: string) {
    let nombrecito = (cohortes.filter((c: any) => c._id === id))
    nombrecito = !!nombrecito[0] && nombrecito[0].Nombre
    return nombrecito
  }

  return (
    <div id='rendimiento-fondo-amarillo'>
      <h1 id="rendimiento-titulo">Tus Notas</h1>
      <div className="rend-container">
        <table className="rend-table">
          <thead className="rend-table-titles">
            <tr id="rend-table-tr">
              <th className="rend-table-th">Cohorte</th>
              <th className="rend-table-th">Examen</th>
              <th className="rend-table-th">Test Totales</th>
              <th className="rend-table-th">Logrados</th>
              <th className="rend-table-th">Requeridos</th>
              <th className="rend-table-th">Resultado</th>
            </tr>
          </thead>
          <tbody className="rend-table-body">
            {!!users && !!users.historia && users.historia.Checkpoints.length > 0 && users.historia.Checkpoints.map((elem: any) => (
              <>
                <tr id="rend-table-tr">
                  <td className="rend-table-td">{getNombre(elem.Cohorte)}</td>
                  <td className="rend-table-td">CP-M1</td>
                  <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP1.totalTests}</td>
                  <td className="rend-table-td">{elem.CP1}</td>
                  <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP1.testsReq}</td>
                  <td className="rend-table-td">{users.cohorte.Checkpoints && (users.cohorte.Checkpoints.CP1.testsReq <= elem.CP1) ?
                    "Aprobado" : "Reprobado"}</td>
                </tr>
                {elem.CP2 === 0 ? null :
                  <tr id="rend-table-tr">
                    <td className="rend-table-td">{getNombre(elem.Cohorte)}</td>
                    <td className="rend-table-td">CP-M2</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP2.totalTests}</td>
                    <td className="rend-table-td">{elem.CP2}</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP2.testsReq}</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && (users.cohorte.Checkpoints.CP2.testsReq <= elem.CP2) ?
                      "Aprobado" : "Reprobado"}</td>
                  </tr>
                }
                {elem.CP3 === 0 ? null :
                  <tr id="rend-table-tr">
                    <td className="rend-table-td">{getNombre(elem.Cohorte)}</td>
                    <td className="rend-table-td">CP-M3</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP3.totalTests}</td>
                    <td className="rend-table-td">{elem.CP3}</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP3.testsReq}</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && (users.cohorte.Checkpoints.CP3.testsReq <= elem.CP3) ?
                      "Aprobado" : "Reprobado"}</td>
                  </tr>
                }
                {elem.CP4 === 0 ? null :
                  <tr id="rend-table-tr">
                    <td className="rend-table-td">{getNombre(elem.Cohorte)}</td>
                    <td className="rend-table-td">CP-M4</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP4.totalTests}</td>
                    <td className="rend-table-td">{elem.CP4}</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && users.cohorte.Checkpoints.CP4.testsReq}</td>
                    <td className="rend-table-td">{users.cohorte.Checkpoints && (users.cohorte.Checkpoints.CP4.testsReq <= elem.CP4) ?
                      "Aprobado" : "Reprobado"}</td>
                  </tr>
                }
              </>
            ))}
          </tbody>
        </table>
        <EstadisticaUser />
      </div>
    </div>
  )
}

export default Rendimiento;