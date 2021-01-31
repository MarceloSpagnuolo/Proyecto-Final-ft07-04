import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersGroup } from "Store/Actions/Users";
import "./GrupoDetail.css";
import ProfileCard from "components/ProfileCard/ProfileCard";
import axios, { AxiosRequestConfig } from "axios";
import { ppid } from "process";


const GrupoDetail = (): JSX.Element => {
    const [pm, setPm] = useState<string>("")
    const [display, setDisplay] = useState<boolean>(false)
    const [update, setUpdate] = useState<boolean>(false)
    const [singrupo, setSingrupo] = useState<any>([])
    const disptach = useDispatch()
    const alumnos: any = useSelector((state: any) => state.Users.users);
    const cg = { c: 1, g: 1 }
    async function agregar(id: any) {
        await axios.put(`http://localhost:3001/users/modify/${id}`, { standup: "600b9852935003272c8b6801" });
        setUpdate(!update)
        return
    }
    async function eliminarPM(group_id: any, pm: any) {
         axios.delete(`http://localhost:3001/standup/PM/${group_id}/${pm}`,)
    }
    useEffect(() => {
        disptach(usersGroup("600b9852935003272c8b6801"))
        const res = axios.get(`http://localhost:3001/users/usercohorte/${"600b9852935003272c8b6902"}`)
        res.then((r) => {
            setSingrupo(r.data)
        })
    }, [update])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
    }

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        setPm(e.target.value)
    }
    return (
        <div className="divsoteGroupAdd">
            <h1 className="titleG">
                Grupo 01
            </h1>
            <h3 className="subTitleG">
                Aquí podra gestionar los PMs y alumnos de <br />este grupo
            </h3>
            <p className="subSubTitleG">Asigne un pm al grupo</p>
            <div className="divAsignarPM">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <select className="selectPMG" value={pm} onChange={(e) => handleChange(e)}>
                        <option value=""></option>
                        {!!singrupo && singrupo.map((p: any) => {
                            if (p.role === "PM") {
                                return (
                                    <option value="Pepito San Pon">{p.name.lastname}</option>
                                )
                            }
                        })}
                    </select>
                    <input type="submit" value="seleccionar" />
                </form>
            </div>
            <p className="pmtitle">PMs del grupo</p>
            <div className="pmContainerName">
                {alumnos.length > 0 && alumnos.map((p: any) => {
                    if (p.role === "PM" && p.standup !== null) {
                        console.log(p._id)
                        return (
                            <div key={"PM" + p._id} className="wq">
                                <img className="roundPM" src="https://i.pinimg.com/236x/22/cd/5b/22cd5bf661c3d8a8550752b981901531.jpg" alt="user" /><p>{p.name.lastname}</p>
                                <button onClick={() => { eliminarPM( "600b9852935003272c8b6801", `${p._id}`); setUpdate(!update) }}>X</button>
                            </div>
                        )
                    }
                })}
            </div>
            <button className="btnAddRespon" onClick={() => setDisplay(!display)}>{!display ? "Agrege Alumnos" : "Cerrar"}</button>
            {display ? <div className="divResponsiveAdd">
                {singrupo.length > 0 && singrupo.map((a: any) => {
                    if (a.role === "alumno") {
                        return (<div key={"SG" + a._id} className="divAddAlRespon" onClick={() => agregar(a._id)} ><img className="roundAlum" src="https://cdn.discordapp.com/attachments/764979688446885898/803132593338843146/sspider.png" alt="" /><div>{`${a.name.firstname} ${a.name.lastname}`}</div></div>)
                    }
                })}
            </div>
                : null}
            <div className="DivProfileCDetail">
                {!!alumnos && alumnos.map((a: any) => {
                    if (a.role === "alumno") {
                        return (<ProfileCard key={"PC" + a._id} props={a} CG={cg} set={{ a: setUpdate, b: update }} />)
                    }
                })}

            </div>
            <div className="divAddToGroup">

            </div>
        </div>
    )
}


export default GrupoDetail;