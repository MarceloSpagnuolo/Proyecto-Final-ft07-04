import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersGroup } from "Store/Actions/Users";
import { getOneStandups } from "Store/Actions/Standups"
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
        <div id="mi-grupo-fondo-amarillo">
            <div id='cabezote-mi-grupo'>
                <div>
                    <h1 className="titleG">

                        Grupo {!!Grupo && Grupo.length > 0 && Grupo[0].Grupo}
                    </h1>
                    <h3 className="subTitleG">
                        Este es el grupo de standup al que perteneces, aqui podras encontrar a tus PM's y compañeros, El camino que te espera en Henry no es fácil,  afortunadamente cuentas con tus compañeros, ellos seran los mejores aliados en los proximos meses
                    </h3>
                </div>
                <div id='container-seccion-mis-pms'>
                    <p id="pm-mi-grupo">PMs del grupo</p>
                    <div id='dos-pms-row'>

                        {alumnos.length > 0 && alumnos.map((p: any) => {
                            if (p.role === "PM" && p.standup !== null) {
                                return (
                                    <div id='pm-asignado-mi-grupo' key={"PM" + p._id} >
                                        <img className="roundPM" src="https://i.pinimg.com/236x/22/cd/5b/22cd5bf661c3d8a8550752b981901531.jpg" alt="user" />
                                        <p>{p.name.firstname} {p.name.lastname}</p>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <div id='grilla-companeros'>



                <div id='alumnos-grupo'>
                    {!!alumnos && alumnos.map((a: any) => {
                        if (a.role === "alumno") {
                            return (<ProfileCard key={"PC" + a._id} props={a} CG={cg} set={{ a: setUpdate, b: update }} />)
                        }
                    })}

                </div>
            </div>
        </div>
    )
}


export default MiGrupo;