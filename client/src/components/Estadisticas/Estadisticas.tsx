import C3Chart from 'react-c3js';
import 'c3/c3.css';
import React, { useState, useEffect, ReactEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alumnosGroup } from "Store/Actions/Users";
import Moquitos from "./ClasesNames";
import axios from "axios";
import "./Estadisticas.css"


const Estadisticas = (props: any) => {
    const { id } = props.match.params;
    const dispatch = useDispatch()
    const [user, setUser] = useState({ value: "" })
    const [display, setDisplay] = useState(0)
    const alumno: any = useSelector((state: any) => state.Users.users);
    const [participa, setParticipa] = useState<any>("")
    const [datin1, setDatin] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v }
        }
    })
    const [datin2, setDatin2] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v }
        }

    })
    const [datin3, setDatin3] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v }
        }
    })
    const [datin4, setDatin4] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v }
        }
    })
    const [modulo, setModulo] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v + '%'; }
        }
    }
    )
    const [modulo2, setModulo2] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v + '%'; }
        }
    }
    )
    const [modulo3, setModulo3] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v + '%'; }
        }
    }
    )
    const [modulo4, setModulo4] = useState<any>({
        columns: [
        ],
        labels: {
            format: function (v) { return v + '%'; }
        }
    }
    )
    const [checkpoint, setCheckpoitn] = useState<any>({
        columns: [],
        labels: {
            format: function (v) { return v }
        }
    }
    )
    const [modulos, setModulos] = useState<any>("");
    const data = [datin1, datin2, datin3, datin4]
    const mod = [modulo, modulo2, modulo3, modulo4]
    useEffect(() => {
        if (alumno) {
            axios.get(`http://localhost:3001/users/asistancePromed/${id}`)
                .then(r => {
                    setModulos(r.data)
                })
        }
    }, [])
    useEffect(() => {
        if (modulos !== "") {
            const a = ["Asistencia", ...modulos[0]]
            const b = ["Asistencia", ...modulos[1]]
            const c = ["Asistencia", ...modulos[2]]
            const d = ["Asistencia", ...modulos[3]]

            setModulo(
                {
                    ...modulo,
                    columns: [...modulo.columns, a]
                }
            )

            setModulo2(
                {
                    ...modulo2,
                    columns: [...modulo2.columns, b]
                }
            )
            setModulo3(
                {
                    ...modulo3,
                    columns: [...modulo3.columns, c]
                }
            )
            setModulo4(
                {
                    ...modulo4,
                    columns: [...modulo4.columns, d]
                }
            )
        }
    }, [modulos])
    useEffect(() => {
        dispatch(alumnosGroup(`${id}`))
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3001/historia/promedioParticipacion/${id}`)
            .then(r => {
                setParticipa(r.data)
            })
    }, [])
    useEffect(() => {
        if (participa !== "") {
            let a = ["Promedio", ...participa[0]]
            let b = ["Promedio", ...participa[1]]
            let c = ["Promedio", ...participa[2]]
            let d = ["Promedio", ...participa[3]]
            setDatin({
                ...datin1,
                columns: [...datin1.columns, a]
            })
            setDatin2({
                ...datin2,
                columns: [...datin2.columns, b]
            })
            setDatin3({
                ...datin3,
                columns: [...datin3.columns, c]
            })
            setDatin4({
                ...datin4,
                columns: [...datin4.columns, d]
            })
        }
    }, [participa])

    useEffect(() => {
        if (user.value !== "") {
            const data = alumno.filter(a => a._id === user.value)
            let o = Object.values(data[0].historia.Checkpoints[0])
            o.pop()
            const cp = ["Notas CP", ...o]
            setCheckpoitn({
                ...checkpoint,
                columns: [...checkpoint.columns, cp]
            })
            const participa = data[0].historia.Modulos[0].Clases.map(c => { return c.Participa })
            const participa2 = data[0].historia.Modulos[1].Clases.map(c => { return c.Participa })
            const participa3 = data[0].historia.Modulos[2].Clases.map(c => { return c.Participa })
            const participa4 = data[0].historia.Modulos[3].Clases.map(c => { return c.Participa })
            const a = ["user", ...participa]
            const b = ["user", ...participa2]
            const c = ["user", ...participa3]
            const d = ["user", ...participa4]
            setDatin(
                {
                    ...datin1,
                    columns: [...datin1.columns, a]
                }
            )
            setDatin2(
                {
                    ...datin2,
                    columns: [...datin2.columns, b]
                }
            )
            setDatin3(
                {
                    ...datin3,
                    columns: [...datin3.columns, c]
                }
            )
            setDatin4(
                {
                    ...datin4,
                    columns: [...datin4.columns, d]
                }
            )
        }
    }, [user])
    // useEffect(() => {
    //     !!alumno._id && axios.get(`http://localhost:3001/users/estudiantes/${alumno._id}`)
    //         .then((r) => {
    //             setUser(r.data)
    //         })
    // }, [!!alumno && !!alumno._id])

    

    function handleChange(e: any) { setUser({ value: e.target.value }); }
    function handleChange2(e: any) { setDisplay(e.target.value); }
    return (
        <>
            <select onChange={handleChange}>
                <option value="">General</option>

                {!!alumno && alumno.length > 0 && alumno.map((a: any) => {
                    return (
                        <option key={a._id} value={a._id}>{`${a.name.firstname} ${a.name.lastname}`}</option>
                    )
                })

                }
            </select>
            <select onChange={handleChange2}>
                <option value="0">Modulo 1</option>
                <option value="1">Modulo 2</option>
                <option value="2">Modulo 3</option>
                <option value="3">Modulo 4</option>
            </select>
            {
                Moquitos.map((m, i) => {
                    const categories = m.Clases.map(c => c.Nombre)
                    return (
                        <div className={display == i ? "mostrar" : "noMostrar"}>
                            <h2>Participacion Modulo {m.Numero}</h2>
                            <C3Chart data={data[i]} axis={{
                                x: {
                                    type: 'category',
                                    categories: categories
                                },
                                y: {
                                    max:4.99,
                                  }
                            }} />
                            <h2>Promedio de Asistencia</h2>
                            <C3Chart data={mod[i]} axis={{
                                x: {
                                    type: 'category',
                                    categories: categories
                                }
                            }} />
                        </div>
                    )
                })

            }
            <div >
                <h2>Notas Checkpoint</h2>
                <C3Chart data={checkpoint} axis={{
                    x: {
                        type: 'category',
                        categories: ["CP1", "CP2", "CP3", "CP4"]
                    }
                }} />
            </div>
        </>
    )
};


export default Estadisticas;
