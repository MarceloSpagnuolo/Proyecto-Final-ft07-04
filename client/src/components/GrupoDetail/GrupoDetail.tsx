import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersGroup } from "Store/Actions/Users";
import { getOneStandups, postPm } from "Store/Actions/Standups"
import "./GrupoDetail.css";
import ProfileCard from "components/ProfileCard/ProfileCard";
import axios, { AxiosRequestConfig } from "axios";
import lider from '../../assets/peak.png'


const GrupoDetail = (props: any): JSX.Element => {
    const [pm, setPm] = useState<string>("")
    const [display, setDisplay] = useState<boolean>(false)
    const [update, setUpdate] = useState<boolean>(false)
    const [singrupo, setSingrupo] = useState<any>([])
    const [PMsingrupo, setPMSingrupo] = useState<any>([])
    const disptach = useDispatch()
    const { id } = props.match.params;
    const alumnos: any = useSelector((state: any) => state.Users.users);
    const Grupo: any = useSelector((state: any) => state.Standups.standup)
    const cg = { c: 1, g: 1 }
    async function agregar(i: any) {
        await axios.put(`http://localhost:3001/users/modify/${i}`, { standup: id });
        setUpdate(!update)
        return
    }
    async function eliminarPM(pm: any) {
        axios.delete(`http://localhost:3001/standup/PM/${id}/${pm}`,)
            .then(() => {
                setUpdate(!update)
            })
    }
    useEffect(() => {
        disptach(getOneStandups(id))
        disptach(usersGroup(id))

    }, [update])
    useEffect(() => {
        if (!!Grupo && Grupo.length > 0 && !!Grupo[0].Cohorte) {
            axios.get(`http://localhost:3001/users/usercohorte/${Grupo[0].Cohorte}`)
                .then((r) => {
                    setSingrupo(r.data[0])
                    setPMSingrupo(r.data[1])
                })
        }
    }, [!!Grupo && Grupo.length, update])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        if (pm) {
            const datos = {
                id: id,
                PM: pm
            }
            disptach(postPm(datos))
        }
        e.preventDefault();
        setUpdate(!update)
    }

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        setPm(e.target.value)
    }

    return (
        <div className="divsoteGroupAdd">
            <br></br>
            <h1 className="titleG">

                Grupo {!!Grupo && Grupo.length > 0 && Grupo[0].Grupo}
            </h1>
            <h3 className="subTitleG">
                Aquí podra gestionar los PMs y alumnos de este grupo
            </h3>
            {!!Grupo && Grupo.length > 0 && Grupo[0].PM.length !== 2 ?
                <>
                    <div id='grupo-detalle-header'>
                        <div id='col-izq-grupo-detalle'>
                            <h1 className="subSubTitleG">Todo gran grupo necesita un gran líder</h1>
                            <h3 className="subSubTitleG">comienza asignando un PM al grupo que quieres crear</h3>
                            <div className="divAsignarPM">
                                <form id='elige-pm' onSubmit={(e) => handleSubmit(e)}>
                                    <select className="selectPMG" value={pm} onChange={(e) => handleChange(e)}>
                                        <option value=""></option>
                                        {!!PMsingrupo && PMsingrupo.map((p: any) => {
                                            if (p.role === "PM") {
                                                return (
                                                    <option value={p._id}>{p.name.firstname} {p.name.lastname}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                    <input id='boton-elige-pm' type="submit" value="seleccionar" />
                                </form>
                            </div>
                        </div>
                        <div id='col-der-grupo-detalle'>
                            <img src={lider} alt="lider" />
                        </div>
                    </div>
                </>
                : <div>Este grupo tiene el número máximo de PMs</div>}
            <br />
            <div id='container-seccion-pms'>
                <p className="pmtitle">PMs del grupo</p>

                {alumnos.length > 0 && alumnos.map((p: any) => {
                    if (p.role === "PM" && p.standup !== null) {
                        return (
                            <div id='pm-asignado-grupo' key={"PM" + p._id}>
                                <img className="roundPM" src="https://i.pinimg.com/236x/22/cd/5b/22cd5bf661c3d8a8550752b981901531.jpg" alt="user" />
                                <p>{p.name.firstname} {p.name.lastname}</p>
                                <button onClick={() => { eliminarPM(`${p._id}`) }}>Eliminar PM</button>
                            </div>
                        )
                    }
                })}

            </div>
            <div id='add-students-interface'>
                <div id='grupo-agrega'>
                    <h1>ALUMNOS DEL GRUPO 01</h1>
                    <button id='add-students' className="btnAddRespon" onClick={() => setDisplay(!display)}>{!display ? "Agrega Alumnos" : "Cerrar"}</button>
                </div>
                <div id='alumnos-grupo'>

                    {!!alumnos && alumnos.map((a: any) => {
                        if (a.role === "alumno") {
                            return (<ProfileCard key={"PC" + a._id} props={a} CG={cg} set={{ a: setUpdate, b: update }} />)
                        }
                    })}


                </div>
                <div id='barra-add-student'>
                    {display ? <div className="divResponsiveAdd">
                        <p id='alumnos-disponibles'>Alumnos Disponibles</p>
                        {singrupo.length > 0 && singrupo.map((a: any) => {
                            if (a.role === "alumno") {
                                return (<div key={"SG" + a._id} className="divAddAlRespon" onClick={() => agregar(a._id)} ><img className="roundAlum" src="https://cdn.discordapp.com/attachments/764979688446885898/803132593338843146/sspider.png" alt="" /><div id='nombre-invitado'>{`${a.name.firstname} ${a.name.lastname}`}</div></div>)
                            }
                        })}
                    </div>
                        : null}
                </div>

            </div>
        </div>

    )
}


export default GrupoDetail;