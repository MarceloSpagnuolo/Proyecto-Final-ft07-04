import C3Chart from 'react-c3js';
import 'c3/c3.css';
import React, { useState, useEffect, ReactEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alumnosGroup } from "Store/Actions/Users";
import Moquitos from "./Moquitos";
import axios from "axios";
import "./Estadisticas.css"


const Estadisticas = () => {
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
    console.log(datin1, "soy atins")
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
    const [modulo2, setModulo2] = useState({
        columns: [
        ],
        labels: {
            format: function (v) { return v + '%'; }
        }
    }
    )
    const [modulo3, setModulo3] = useState({
        columns: [
        ],
        labels: {
            format: function (v) { return v + '%'; }
        }
    }
    )
    const [modulo4, setModulo4] = useState({
        columns: [
        ],
        labels: {
            format: function (v) { return v + '%'; }
        }
    }
    )
    const data = [datin1, datin2, datin3, datin4]
    const mod = [modulo, modulo2, modulo3, modulo4]

    // useEffect(() => {
    //     if (alumno) {
    //         axios.get(`http://localhost:3001/users/asistancePromed/600b9852935003272c8b6801`)
    //             .then(r => {
    //                 r.data.map((a, i) => {
    //                     const arr = Object.values(a)
    //                     const y = arr.map((p: any) => { return p / alumno.length * 100 })
    //                     const t = ["Asistencia", ...y]
    //                     console.log(t, "w")
    //                     if (i == 0) {
    //                         setModulo(
    //                             {
    //                                 ...modulo,
    //                                 columns: [t]
    //                             }
    //                         )
    //                     }
    //                 })
    //             })
    //     }
    // }, [])
    console.log(participa)
    useEffect(() => {
        dispatch(alumnosGroup("600b9852935003272c8b6801"))
    }, [])
    useEffect(() => {
        axios.get("http://localhost:3001/historia/promedio/600b9852935003272c8b6801")
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
    // useEffect(() => {
    //     if (alumno) {
    //         let arr1 = new Array(9)
    //         let arr2 = new Array(14);
    //         let arr3 = new Array(8);
    //         let arr4 = new Array(5);
    //         alumno.map((a, index) => {
    //             let is = index == alumno.length - 1
    //             a.historia.Modulos.map((c, i) => {
    //                 if (i == 0) {
    //                     c.Clases.map((p, id) => {
    //                         arr1[id] = isNaN(arr1[id]) ? 0 : arr1[id]
    //                         arr1[id] += p.Participa
    //                         arr1[id] = is ? arr1[id] / alumno.length : arr1[id]
    //                     })
    //                 }
    //                 if (i == 1) {
    //                     c.Clases.map((p, id) => {
    //                         arr2[id] = isNaN(arr2[id]) ? 0 : arr2[id]
    //                         arr2[id] += p.Participa
    //                         arr2[id] = is ? arr2[id] / alumno.length : arr2[id]
    //                     })
    //                 }
    //                 if (i == 2) {
    //                     c.Clases.map((p, id) => {
    //                         arr3[id] = isNaN(arr3[id]) ? 0 : arr3[id]
    //                         arr3[id] += p.Participa
    //                         arr3[id] = is ? arr3[id] / alumno.length : arr3[id]
    //                     })
    //                 }
    //                 if (i == 3) {
    //                     c.Clases.map((p, id) => {
    //                         arr4[id] = isNaN(arr4[id]) ? 0 : arr4[id]
    //                         arr4[id] += p.Participa
    //                         arr4[id] = is ? arr4[id] / alumno.length : arr4[id]
    //                     })
    //                 }
    //             })
    //         })
    //         console.log(arr1, "sooyelma")
    //         console.log(alumno.length)
    //         let a = ["Promedio", ...arr1]
    //         let b = ["Promedio", ...arr2]
    //         let c = ["Promedio", ...arr3]
    //         let d = ["Promedio", ...arr4]
    //         setDatin(
    //             {
    //                 ...datin1,
    //                 columns: [...datin1.columns, a]
    //             }
    //         )
    //         setDatin2(
    //             {
    //                 ...datin2,
    //                 columns: [...datin2.columns, b]
    //             }
    //         )
    //         setDatin3(
    //             {
    //                 ...datin3,
    //                 columns: [...datin3.columns, c]
    //             }
    //         )
    //         setDatin4(
    //             {
    //                 ...datin4,
    //                 columns: [...datin4.columns, d]
    //             }
    //         )
    //         console.log(arr1, "SOY EL ARRAy paRECIDO AL BACK")
    //     }
    // }, [!!alumno && alumno.length])

    useEffect(() => {
        if (user.value !== "") {
            const data = alumno.filter(a => a._id === user.value)
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
    // const m1 = !!alumno && alumno.length > 0 && alumno.reducer(function (sum, moquito) {
    //     return (moquito.checkpoint[0].cp1 !== true) ? sum : sum + 1;

    // })


    // useEffect(() => {
    //     console.log("cp1")
    //     !!alumno._id && axios.get(`http://localhost:3001/users/estudiantes/${alumno._id}`)
    //         .then((r) => {
    //             console.log(r.data)
    //             setUser(r.data)
    //         })

    // }, [!!alumno && !!alumno._id])

    // console.log(user, "vaca")

    // {
    //     columns: [
    //         ['data1', Moquitos.length,],
    //         ['data2', 2]
    //     ]
    // }
    function handleChange(e: any) { setUser({ value: e.target.value }); }
    function handleChange2(e: any) { setDisplay(e.target.value); }
    return (
        <>
            <h1>holi</h1>
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
                            <h2>Modulo {m.Numero}</h2>
                            <C3Chart data={data[i]} axis={{
                                x: {
                                    type: 'category',
                                    categories: categories
                                }
                            }} />
                        </div>
                    )

                })
            }
            <C3Chart data={modulo} />
        </>
    )
};


export default Estadisticas;
