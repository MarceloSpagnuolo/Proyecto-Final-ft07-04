import React, {useRef, createElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getActiveCohortes, getCohorte, changeTests } from "Store/Actions/Cohortes";
import { getUsersbyCohorte, putNotas } from "Store/Actions/Users";
import "./Carga.css";
import Swal from "sweetalert2";

function Carga() {
  const { cohorte, cohortes } = useSelector((state: any) => state.Cohortes);
  const { users } = useSelector((state: any) => state.Users);
  const dispatch = useDispatch();
  const textAreaRef1: any = useRef(null);
  const textAreaRef2: any = useRef(null);
  const textAreaRef3: any = useRef(null);
  const textAreaRef4: any = useRef(null);

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

  function handleTests(e: any) {
    const datos = e.target.name.split("/");
    const cohorteId = datos[0];
    const checkpoint = datos[1];
    const dato = datos[2];
    dispatch(changeTests(cohorteId, { checkpoint, dato, valor: e.target.value }));

  }

  function copyToClipboard(e: any) {
    // console.log(e.currentTarget)
    let arreglo;
    if(e.target.name === "CP1") {
      arreglo = textAreaRef1.current.childNodes
    } else if (e.target.name === "CP2") {
      arreglo = textAreaRef2.current.childNodes      
    } else if (e.target.name === "CP3") {
      arreglo = textAreaRef3.current.childNodes      
    } else if (e.target.name === "CP4") {
      arreglo = textAreaRef4.current.childNodes
    }

    let copia: any = [];

    arreglo.forEach((c: any) => {
      if(c.attributes.class.nodeValue !== "Oculta") {
        copia.push("\n"+c.innerHTML)
      }
    })
    navigator.clipboard.writeText(copia);
    Swal.fire({
      icon: 'success',
      title: 'Copiado al portapapeles!',
      showConfirmButton: false,
      timer: 1200
    })
  }

  return (
    <>
      <div id='container-seccion-carga'>
        <h2 className="Carga-Titulo">Carga de Notas y Control de Checkpoints</h2>
        <div className='container-header-carga padding-container-header-carga'>
          <div className="Carga-Check">
            <p id='texto-intro-carga-notas'>Este es el panel de control de notas y checkpoints, para comenzar explorando opciones selecciona un cohorte </p>
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
          {cohorte && cohorte.length > 0 && (
            <div className="Carga-CP">
              <span className='carga-texto-caja-negra'>
                Checkpoint 1: Tests:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP1.totalTests}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP1/totalTests"}
                  id="Carga-Nro" type="number" />
                Requeridos:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP1.testsReq}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP1/testsReq"}
                  id="Carga-Nro" type="number" />
              </span><br />
              <span className='carga-texto-caja-negra'>Checkpoint 2: Tests:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP2.totalTests}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP2/totalTests"}
                  id="Carga-Nro" type="number" />
                Requeridos:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP2.testsReq}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP2/testsReq"}
                  id="Carga-Nro" type="number" />
              </span><br />
              <span className='carga-texto-caja-negra'>Checkpoint 3: Tests:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP3.totalTests}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP3/totalTests"}
                  id="Carga-Nro" type="number" />
                Requeridos:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP3.testsReq}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP3/testsReq"}
                  id="Carga-Nro" type="number" />
              </span><br />
              <span className='carga-texto-caja-negra'>Checkpoint 4: Tests:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP4.totalTests}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP4/totalTests"}
                  id="Carga-Nro" type="number" />
                Requeridos:{" "}
                <input
                  defaultValue={cohorte[0].Checkpoints.CP4.testsReq}
                  onChange={(e) => handleTests(e)}
                  name={cohorte[0]._id + "/CP4/testsReq"}
                  id="Carga-Nro" type="number" />
              </span><br />
            </div>
          )}
        </div>
        <div className="Carga-Body">

          <div className="Carga-Notas">

            <div>
              <table className="Carga-Tabla" >
                <thead>
                  <tr id='encabezado-tabla-notas'>
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
        </div>
        <p id='aprobados-por-cohorte'>Alumnos aprobados por cohorte</p>
        <div className="container-lista-aprobados">
          <div className="Carga-Lista">
            <span>Aprobados CP1</span>
            <button name="CP1" onClick={(e) =>  copyToClipboard(e)}>Copiar Lista</button>
            <div id='carga-nombres-aprobados-cohorte'>
              <ul ref={textAreaRef1} className="Carga-Estilo-Lista">
                {users && users.length > 0 &&
                  users.map((user: any) => {
                    const historia = user.historia.Checkpoints.filter(
                      (e: any) => e.Cohorte === cohorte[0]._id
                    );
                    return <li className={historia[0].CP1 >=
                      cohorte[0].Checkpoints.CP1.testsReq ? "" : "Oculta"}>
                      {user.github}</li>
                  })}
              </ul>
            </div>
          </div>
          <div className="Carga-Lista">
            <span>Aprobados CP2</span>
            <button name="CP2" onClick={(e) =>  copyToClipboard(e)}>Copiar Lista</button>
            <div id='carga-nombres-aprobados-cohorte'>
              <ul ref={textAreaRef2} className="Carga-Estilo-Lista">
                {users && users.length > 0 &&
                  users.map((user: any) => {
                    const historia = user.historia.Checkpoints.filter(
                      (e: any) => e.Cohorte === cohorte[0]._id
                    );
                    return <li className={historia[0].CP2 >=
                      cohorte[0].Checkpoints.CP2.testsReq ? "" : "Oculta"}>
                      {user.github}</li>
                  })}
              </ul>
            </div>
          </div>
          <div className="Carga-Lista">
            <span>Aprobados CP3</span>
            <button name="CP3" onClick={(e) =>  copyToClipboard(e)}>Copiar Lista</button>
            <div id='carga-nombres-aprobados-cohorte'>
              <ul ref={textAreaRef3} className="Carga-Estilo-Lista">
                {users && users.length > 0 &&
                  users.map((user: any) => {
                    const historia = user.historia.Checkpoints.filter(
                      (e: any) => e.Cohorte === cohorte[0]._id
                    );
                    return <li className={historia[0].CP3 >=
                      cohorte[0].Checkpoints.CP3.testsReq ? "" : "Oculta"}>
                      {user.github}</li>
                  })}
              </ul>
            </div>
          </div>
          <div className="Carga-Lista">
            <span>Aprobados CP4</span>
            <button name="CP4" onClick={(e) =>  copyToClipboard(e)}>Copiar Lista</button>
            <div id='carga-nombres-aprobados-cohorte'>
              <ul ref={textAreaRef4} className="Carga-Estilo-Lista">
                {users && users.length > 0 &&
                  users.map((user: any) => {
                    const historia = user.historia.Checkpoints.filter(
                      (e: any) => e.Cohorte === cohorte[0]._id
                    );
                    return <li className={historia[0].CP4 >=
                      cohorte[0].Checkpoints.CP4.testsReq ? "" : "Oculta"}>
                      {user.github}</li>
                  })}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Carga;