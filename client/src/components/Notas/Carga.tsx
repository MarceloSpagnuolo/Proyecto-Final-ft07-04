import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActiveCohortes, getCohorte } from "Store/Actions/Cohortes";
import { getUsersbyCohorte, putNotas } from "Store/Actions/Users";
import "./Carga.css";

function Carga() {
  const { cohorte, cohortes } = useSelector((state: any) => state.Cohortes);
  const { users } = useSelector((state: any) => state.Users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActiveCohortes(true));
  }, []);

  function handleCohortes(e: any) {
    if (e.target.value) {
      dispatch(getCohorte(e.target.value));
      dispatch(getUsersbyCohorte(e.target.value));
    }
  }

  function handleInputs(e: any) {
    console.log(e.target.name);
    const datos = e.target.name.split("/");
    const historia = datos[0];
    const checkpoint = datos[2];
    dispatch(
      putNotas(historia, {
        checkpoint: checkpoint,
        cohorteId: cohorte[0]._id,
        tests: e.target.value,
      })
    );
  }

  return (
    <>
    <div className="Carga-Body">
      <div className="Carga-Notas">
        <div className="Carga-Check">
          <select
            name="select"
            className="Carga-Select"
            onChange={(e) => handleCohortes(e)}
          >
            <option value="">Seleccione un Cohorte</option>
            {cohortes &&
              cohortes.length > 0 &&
              cohortes.map((elem: any) => (
                <option value={elem._id}>
                  {elem.Nombre} - Inicio: {elem.Start}
                </option>
              ))}
          </select>
        </div>
        <div>
          <table className="Carga-Tabla">
            <thead>
              <tr>
                <th className="Carga-Th">Alumno</th>
                <th className="Carga-Th">Github</th>
                <th className="Carga-Th">CP1</th>
                <th className="Carga-Th">Res</th>
                <th className="Carga-Th">CP2</th>
                <th className="Carga-Th">Res</th>
                <th className="Carga-Th">CP3</th>
                <th className="Carga-Th">Res</th>
                <th className="Carga-Th">CP4</th>
                <th className="Carga-Th">Res</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td className="Carga-Td">
                  Tests: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP1.totalTests}<br />
                  Requ: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP1.testsReq}
                </td>
                <td></td>
                <td className="Carga-Td">
                  Tests: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP2.totalTests}<br />
                  Requ: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP2.testsReq}
                </td>
                <td></td>
                <td className="Carga-Td">
                  Tests: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP3.totalTests}<br />
                  Requ: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP3.testsReq}
                </td>
                <td></td>
                <td className="Carga-Td">
                  Tests: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP4.totalTests}<br />
                  Requ: {cohorte && cohorte.length > 0 && cohorte[0].Checkpoints.CP4.testsReq}
                </td>
              </tr>
              {!!users &&
                users.length > 0 &&
                users.map((elem: any) => {
                  const historia = elem.historia.Checkpoints.filter(
                    (e: any) => e.Cohorte === cohorte[0]._id
                  );
                  return (
                    elem.historia && (
                      <tr key={elem._id} id="Carga-Tr">
                        <td className="Carga-Td">
                          {elem.name.firstname + " " + elem.name.lastname}
                        </td>
                        <td className="Carga-Td">{elem.github}</td>
                        <td className="Carga-Td">
                          <input
                            type="number"
                            name={elem.historia._id + "/" + elem._id + "/CP1"}
                            defaultValue={historia[0].CP1}
                            id="Carga-Nro"
                            onChange={(e) => handleInputs(e)}
                          />
                        </td>
                        <td className="Carga-Td">
                          <img src={
                          historia[0].CP1 >=
                          cohorte[0].Checkpoints.CP1.testsReq
                            ? "http://localhost:3001/Imagenes/success.png"
                            : "http://localhost:3001/Imagenes/error.png"} 
                            className="Carga-Input-Imagen" />
                        </td>
                        <td className="Carga-Td">
                          <input
                            name={elem.historia._id + "/" + elem._id + "/CP2"}
                            defaultValue={historia[0].CP2}
                            type="number"
                            id="Carga-Nro"
                            onChange={(e) => handleInputs(e)}
                          />
                        </td>
                        <td className="Carga-Td">
                           <img src={
                          historia[0].CP2 >=
                          cohorte[0].Checkpoints.CP2.testsReq
                            ? "http://localhost:3001/Imagenes/success.png"
                            : "http://localhost:3001/Imagenes/error.png"} 
                            className="Carga-Input-Imagen" />
                        </td>
                        <td className="Carga-Td">
                          <input
                            name={elem.historia._id + "/" + elem._id + "/CP3"}
                            defaultValue={historia[0].CP3}
                            type="number"
                            id="Carga-Nro"
                            onChange={(e) => handleInputs(e)}
                          />
                        </td>
                        <td className="Carga-Td">
                           <img src={
                          historia[0].CP3 >=
                          cohorte[0].Checkpoints.CP3.testsReq
                            ? "http://localhost:3001/Imagenes/success.png"
                            : "http://localhost:3001/Imagenes/error.png"} 
                            className="Carga-Input-Imagen" />
                        </td>
                        <td className="Carga-Td">
                          <input
                            name={elem.historia._id + "/" + elem._id + "/CP4"}
                            defaultValue={historia[0].CP4}
                            type="number"
                            id="Carga-Nro"
                            onChange={(e) => handleInputs(e)}
                          />
                        </td>
                        <td className="Carga-Td">
                           <img src={
                          historia[0].CP4 >=
                          cohorte[0].Checkpoints.CP4.testsReq
                            ? "http://localhost:3001/Imagenes/success.png"
                            : "http://localhost:3001/Imagenes/error.png"} 
                            className="Carga-Input-Imagen" />
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="Carga-Listas">
        <div className="Carga-Lista">
          <span>Aprobados CP1</span>
        </div>
        <div className="Carga-Lista">
          <span>Aprobados CP2</span>
        </div>
        <div className="Carga-Lista">
          <span>Aprobados CP3</span>
        </div>
        <div className="Carga-Lista">
          <span>Aprobados CP4</span>
        </div>
      </div>
      </div>
    </>
  );
}

export default Carga;
