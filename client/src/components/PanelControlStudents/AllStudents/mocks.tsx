import React from "react";

interface studentInfo {
    name: string;
    dateRegistro: number;
    email: string;
    cohorte: number | string;
    standUp: number | string;
}
var estudiantes: studentInfo[] = [
    {
        name: "Jorge Malo",
        dateRegistro: 23 - 1 - 21,
        email: "jorgeM21@gmail.com",
        cohorte: 5,
        standUp: 9
    },
    {
        name: "Javier Alvarez",
        dateRegistro: 23 - 1 - 21,
        email: "javierAlvarez21@gmail.com",
        cohorte: 10,
        standUp: "Sin Asignar"
    },
    {
        name: "David Gonzalez",
        dateRegistro: 23 - 1 - 21,
        email: "davidGonz4l3z@gmail.com",
        cohorte: 7,
        standUp: 14
    },
    {
        name: "Rocio Quiroga",
        dateRegistro: 23 - 1 - 21,
        email: "ro-quiroga33@hotmail.com",
        cohorte: 8,
        standUp: 3
    },
    {
        name: "Ruben Aguirre",
        dateRegistro: 23 - 1 - 21,
        email: "aguirre.Ruben66@hotmail.com",
        cohorte: 9,
        standUp: 11
    },
    {
        name: "Santiago Martinez",
        dateRegistro: 23 - 1 - 21,
        email: "santi7martinez@gmail.com",
        cohorte: 6,
        standUp: 7
    },
    {
        name: "Angela Eyol",
        dateRegistro: 23 - 1 - 21,
        email: "angela41@gmail.com",
        cohorte: 7,
        standUp: 4
    },
    {
        name: "Susana Gimenez",
        dateRegistro: 23 - 1 - 21,
        email: "susanaGimenez@gmail.com",
        cohorte: 8,
        standUp: "Sin Asignar"
    },
    {
        name: "Ana Maria Scaduto",
        dateRegistro: 23 - 1 - 21,
        email: "anita22@hotmail.com",
        cohorte: 7,
        standUp: 5
    },
    {
        name: "Yanina Mortero",
        dateRegistro: 23 - 1 - 21,
        email: "yani89@hotmail.com",
        cohorte: 7,
        standUp: 8
    },

];

export default estudiantes;