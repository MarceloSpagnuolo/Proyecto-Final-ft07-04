import React, { useState, useEffect } from "react";
import { postStandup, getStandups, delStandup, getStandupsByCohorte } from "Store/Actions/Standups";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GrupoCreate = () => {
    const [num, setNum] = useState<number>(0)
    const [a, seta] = useState<number>()
    const dispatch = useDispatch();
    const grupos: any = useSelector((state: any) => state.Standups.standups);

    useEffect(() => {
        dispatch(getStandupsByCohorte("600b9852935003272c8b6902"))
    }, []);
    const props = "600b9852935003272c8b6902"

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
            CohorteId: props
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
    return (
        <div>
            <h1>Holi</h1>
            <div>

            </div>
            {!!grupos && grupos.map((g: any) => {
                return (
                    <div key={g.Grupo + g.Cohorte}> <p>Grupo: {g.Grupo}</p> <Link to={`/GruopDetail/${g._id}`}> ir</Link> <button onClick={() => { deletGroup(g._id); }}>X</button></div>

                )

            })}
            <div>
                <p>
                    crear nuevo grupo?
                    <button onClick={() => newGrupo()}>Crear</button>
                </p>
            </div>
        </div>
    )
}

export default GrupoCreate;