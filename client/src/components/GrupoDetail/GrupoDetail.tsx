import React, { useState } from "react";
import "./GrupoDetail.css"
import ProfileCard from "components/ProfileCard/ProfileCard"


const GrupoDetail = (): JSX.Element => {
    const [pm, setPm] = useState<string>("")
    const [display, setDisplay] = useState<boolean>(false)
    let pmArr: Array<string> = ["Pepito San Pon", "PM2"];
    let alArr: Array<string> = ["Pepito Pon", "Babi Son", "Mangostita Man", "Pepon Pan", "El granjero", "nombre de relleno"];
    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        pmArr.push(pm);
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
                Aquí podra gestionar los PMs y alumnos de <br/>este grupo
            </h3>
            <p className="subSubTitleG">Asigne un pm al grupo</p>
            <div className="divAsignarPM">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <select className="selectPMG" value={pm} onChange={(e) => handleChange(e)}>
                        <option value=""></option>                                 {/*Mapeado de pms*/}
                        <option value="Pepito San Pon">Pepito San Pon</option>
                        <option value="PM2">PM2</option>
                        <option value="PM3">PM3</option>
                    </select>
                    <input type="submit" value="seleccionar" />
                </form>
            </div>
            <p className="pmtitle">PMs del grupo</p>
            <div className="pmContainerName">
                {pmArr.length > 0 && pmArr.map(p => {
                    return (
                        <div className="wq"> <img className="roundPM" src="https://i.pinimg.com/236x/22/cd/5b/22cd5bf661c3d8a8550752b981901531.jpg" alt="user" /><p>{p}</p></div>
                    )
                })}
            </div>
            <button className="btnAddRespon" onClick={() => setDisplay(!display)}>{!display ?"Agrege Alumnos": "Cerrar"}</button>
            {display ? <div className="divResponsiveAdd">
                {alArr.length > 0 && alArr.map(a => {
                    return (<div className="divAddAlRespon"><img className="roundAlum" src="https://cdn.discordapp.com/attachments/764979688446885898/803132593338843146/sspider.png" alt="" /><div>{a}</div></div>)
                })}
            </div>
                : null}
            <div className="DivProfileCDetail">
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
                <ProfileCard />
            </div>
            <div className="divAddToGroup">

            </div>
        </div>
    )
}


export default GrupoDetail;