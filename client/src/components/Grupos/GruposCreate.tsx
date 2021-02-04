import React, { useState, useEffect } from "react";
import { postStandup, delStandup, getStandupsByCohorte } from "Store/Actions/Standups";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./GruposCreate.css";

const GrupoCreate = (props: any) => {
    const dispatch = useDispatch();
    const grupos: any = useSelector((state: any) => state.Standups.standups);
    const { cohorte } = useSelector((state: any) => state.Cohortes);
    const [inicio, setInicio] = useState(Date.now);
    const { id } = props.match.params;
    // const prueba = "600b9852935003272c8b6902"

    useEffect(() => {
        dispatch(getStandupsByCohorte(id))
    }, []);

    function newGrupo() {
        let index: null | number = null;


        for (let g = 0; g < grupos.length; g++) {
            if (grupos[g].Grupo !== g + 1) {
                index = g + 1;
                break
            }
        }
        const grupo = index ?? grupos.length + 1;
        const datos = {
            NumeroGrupo: grupo,
            CohorteId: id
        }
        dispatch(postStandup(datos))
        window.location.reload()
    }
    function deletGroup(id: any) {
        // const datos = {
        //     id: id
        // }
        dispatch(delStandup(id))
    }

    useEffect(() => {
        cohorte && cohorte.length > 0 && setInicio(cohorte[0].Start);
    }, [cohorte])

    return (
        <div className="Activos-Container">
            <h1 id="ht">Todos los grupos</h1>
            <p>Aquí encontrarás todos los grupos existentes en la cohorte {cohorte && cohorte.length > 0 && cohorte[0].Nombre}</p>
            <ul><p> Ten en cuenta lo siguiente:</p>
                <li>Son grupos de StandUp dirigidos por PM´s.</li>
                <li>Al dar clic en "Ver" puedes ver el detalle del grupo.</li>
                <li>Puedes eliminarlo dando clic en la "X".</li>
                <li>La eliminación no requiere confirmación, ten cuidado.</li>
            </ul>
            <div id="top-nd">
                <div id="tit">Grupos</div>
                <div id="taber">
                    <div id="cards">
                        {!!grupos && grupos.map((g: any) => {
                            return (
                                <div id="card" key={g.Grupo + g.Cohorte}><button onClick={() => { deletGroup(g._id); }}>X</button><p>Grupo: {g.Grupo}</p> <Link to={`/GruopDetail/${g._id}`}>Ver</Link> </div>
                            )
                        })}
                    </div>
                </div>
                <div id="bot-but">
                    <p> <span> Acá podrás crear un nuevo grupo dentro de {cohorte && cohorte.length > 0 && cohorte[0].Nombre}</span>
                        <button onClick={() => newGrupo()}>Nuevo grupo</button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GrupoCreate;