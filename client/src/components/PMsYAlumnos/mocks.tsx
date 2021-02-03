import React from "react";

interface notasInfo {
    examen: string;
    ejercicios: number;
    logrados: number | string;
    necesita: number | string;
    resultado: number | string;
}
var notas: notasInfo[] = [
    {
        examen: "CP-M1",
        ejercicios: 17,
        logrados: 13,
        necesita: 11,
        resultado: "APROBADO"
    },
    {
        examen: "CP-M2",
        ejercicios: 45,
        logrados: 37,
        necesita: 35,
        resultado: "APROBADO"
    },
    {
        examen: "CP-M3",
        ejercicios: 29,
        logrados: 31,
        necesita: 19,
        resultado: "APROBADO"
    },
    {
        examen: "CP-M4",
        ejercicios: 42,
        logrados: 28,
        necesita: "14 de cada parte = 28 total",
        resultado: "APROBADO"
    },

];

export default notas;