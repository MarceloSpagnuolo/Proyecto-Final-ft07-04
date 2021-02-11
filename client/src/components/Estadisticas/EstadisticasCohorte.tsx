import React, { useEffect, useState } from "react";
import axios from "axios";
import C3Chart from 'react-c3js';
import 'c3/c3.css';


const EstadisticasCohorte = () => {
    const [data, setData] = useState<any>("");
    const [checkpoint, setCheckpoint] = useState<any>({
        columns: [
        ],
        type: 'bar',
        labels: {
            format: function (v) { return v }
        }
    })
    useEffect(() => {
        axios.get(`http://localhost:3001/historia/promedioNotas/600b9852935003272c8b6902`)
            .then((r) => {
                setData(r.data);
            });
    }, []);
    useEffect(() => {
        if (data !== "") {
            let alumnos = ["alumnos"]
            let aprobados = ["aprobados"]
            let promedio = ["promedio"]
            data.forEach((c) => {
                alumnos.push(c.alumnos)
                aprobados.push(c.aprobados)
                promedio.push(c.promedio)
            })
            setCheckpoint({
                ...checkpoint,
                columns: [...checkpoint.columns, alumnos, aprobados, promedio]
            })
           
        }
    }, [data])   
    return (
        <div>
            <div >
                <h2>Notas Checkpoint</h2>
                <C3Chart data={checkpoint} axis={{
                    x: {
                        type: 'category',
                        categories: ["CP1", "CP2", "CP3", "CP4"]
                    }
                }} />
            </div>
        </div>
    )
};

export default EstadisticasCohorte;