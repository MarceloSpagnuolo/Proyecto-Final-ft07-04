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
      <div>
        <div>
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
                          {historia[0].CP1 >=
                          cohorte[0].Checkpoints.CP1.testsReq
                            ? "A"
                            : "R"}
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
                        <td className="Carga-Td"> </td>
                        <td className="Carga-Td">
                          <input
                            name={elem.historia._id + "/" + elem._id + "/CP3"}
                            defaultValue={historia[0].CP3}
                            type="number"
                            id="Carga-Nro"
                            onChange={(e) => handleInputs(e)}
                          />
                        </td>
                        <td className="Carga-Td"> </td>
                        <td className="Carga-Td">
                          <input
                            name={elem.historia._id + "/" + elem._id + "/CP4"}
                            defaultValue={historia[0].CP4}
                            type="number"
                            id="Carga-Nro"
                            onChange={(e) => handleInputs(e)}
                          />
                        </td>
                        <td className="Carga-Td"> </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Carga;
