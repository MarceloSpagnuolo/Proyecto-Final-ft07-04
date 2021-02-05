import C3Chart from 'react-c3js';
import 'c3/c3.css';
import React, { useState, useEffect } from "react";
import Moquitos from "./Moquitos";


const Estadisticas = () => {
    // const [datin, setDatin] = useState<any>(data)
    const cp1 = Moquitos.reduce(function (sum, moquito) {
        return (moquito.checkpoint[0].cp1 !== true) ? sum : sum + 1;

    }, 0);
    const data = {
        columns: [
            ['data1', Moquitos.length, cp1],
            ['data2', 2]
        ]
    }
    const cp2 = Moquitos.reduce(function (sum, moquito) {
        return (moquito.checkpoint[0].cp2 !== true) ? sum : sum + 1;

    }, 0);
    const cp3 = Moquitos.reduce(function (sum, moquito) {
        return (moquito.checkpoint[0].cp3 !== true) ? sum : sum + 1;

    }, 0);
    const cp4 = Moquitos.reduce(function (sum, moquito) {
        return (moquito.checkpoint[0].cp4 !== true) ? sum : sum + 1;

    }, 0);


    // useEffect(() => {
    //     if (cp1 > 0) setDatin(data.columns[0].concat(5))
    // }, [cp1 > 0])

    console.log(cp1)

    // {
    //     columns: [
    //         ['data1', Moquitos.length,],
    //         ['data2', 2]
    //     ]
    // }
    return (
        <>
            <h1>holi</h1>
            <C3Chart data={data} />
        </>
    )
};


export default Estadisticas;
