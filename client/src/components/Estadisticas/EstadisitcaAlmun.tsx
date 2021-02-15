import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import C3Chart from 'react-c3js';
import 'c3/c3.css';


const EstadisticaUser = () => {
    const alumno: any = useSelector((state: any) => state.Users.user);
    const [user, setUser] = useState<any>("")
    const [d, setD] = useState<any>("")
    const [data, setData] = useState<any>({
        columns: [
        ],
        type: 'bar',

        labels: {
            format: function (v) { return v }
        }
    })
    useEffect(() => {
        !!alumno._id && axios.get(`http://localhost:3001/users/estudiantes/${alumno._id}`)
            .then((r) => {
                setUser(r.data)
            })
    }, [!!alumno && !!alumno._id])

    useEffect(() => {
        if (user !== "") {
            axios.get(`http://localhost:3001/historia/promedioNotas/${user.cohorte._id}`)
                .then(r => {
                    setD(r.data)
                })
            let a = Object.values(user.historia.Checkpoints[0])
            a.pop()
            const cp = ["Mis Notas", ...a]
            setData({
                ...data,
                columns: [...data.columns, cp]
            })
        }
    }, [user])
    useEffect(() => {
        if (d !== "") {
            const a = d.map(p => { return p.promedio })
            const b = ["Promedio", ...a]
            setData({
                ...data,
                columns: [...data.columns, b]
            })
        }
    }, [d])
    return (
        <div>
            <h2>Notas Checkpoint</h2>
            <C3Chart data={data} axis={{
                x: {
                    type: 'category',
                    categories: ["CP1", "CP2", "CP3", "CP4"]
                }
            }} />
        </div>
    )
};


export default EstadisticaUser;