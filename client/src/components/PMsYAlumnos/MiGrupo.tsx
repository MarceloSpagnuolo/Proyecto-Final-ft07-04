import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersGroup } from "Store/Actions/Users";
import { getOneStandups} from "Store/Actions/Standups"
import "./MiGrupo.css";
import ProfileCard from "components/ProfileCard/ProfileCard";


const MiGrupo = (props: any): JSX.Element => {
    const [update, setUpdate] = useState<boolean>(false)
    const disptach = useDispatch()
    const { id } = props.match.params;
    const alumnos: any = useSelector((state: any) => state.Users.users);
    const Grupo: any = useSelector((state: any) => state.Standups.standup)
    const cg = { c: 1, g: 1 }
    
    useEffect(() => {
        disptach(getOneStandups(id))
        disptach(usersGroup(id))

    }, [update])


   return (
        <div className="divsoteGroupAdd">
            <h1 className="titleG">
                
                Grupo {!!Grupo && Grupo.length > 0 && Grupo[0].Grupo}
            </h1>
            <h3 className="subTitleG">
                Aquí podras ver tu grupo <br />de standup al que perteneces
            </h3>            
            <p className="pmtitle">PMs del grupo</p>
            <div className="pmContainerName">
                {alumnos.length > 0 && alumnos.map((p: any) => {
                    if (p.role === "PM" && p.standup !== null) {
                        return (
                            <div key={"PM" + p._id} className="wq">
                                <img className="roundPM" src="https://i.pinimg.com/236x/22/cd/5b/22cd5bf661c3d8a8550752b981901531.jpg" alt="user" /><p>{p.name.firstname} {p.name.lastname}</p>
                            </div>
                        )
                    }
                })}
            </div>
            
           <div className="DivProfileCDetail">
                {!!alumnos && alumnos.map((a: any) => {
                    if (a.role === "alumno") {
                        return (<ProfileCard key={"PC" + a._id} props={a} CG={cg} set={{ a: setUpdate, b: update }} />)
                    }
                })}

            </div>
        </div>
    )
}


export default MiGrupo;