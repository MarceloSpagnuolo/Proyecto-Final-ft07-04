import User from "./src/Models/users"
import Group from "./src/Models/groups"
import Cohorte from "./src/Models/cohorte"




export default async function Insert() {
    const users = [{
        _id: "600b9852935003272c8b6100",
        name: {firstname: "Admin", lastname: "Admin"},
        role: "admin",
        email: "admin@soyadmin.com",
        password: "D3ltaG@mma",
    },
    {
        _id: "600b9852935003272c8b6101",
        name: {firstname: "Alan", lastname: "Casella"},
        role: "alumno",
        email: "alan@gmail.com",
        password: "NoMerobenp1z",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6801"
    },
    {
        _id: "600b9852935003272c8b6102",
        name: {firstname: "Marcelo", lastname: "Spagnuolo"},
        role: "alumno",
        email: "marce@gmail.com",
        password: "Soy4nacontraseña",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6801"
    },
    {
        _id: "600b9852935003272c8b6103",
        name: {firstname: "Eliezer", lastname: "Babi"},
        role: "alumno",
        email: "Eli@gmail.com",
        password: "Vaca4444",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6801"
    },
    {
        _id: "600b9852935003272c8b6104",
        name: {firstname: "Chano", lastname: "Nieto"},
        role: "alumno",
        email: "chano@gmail.com",
        password: "Culiao123",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6801"
    },
    {
        _id: "600b9852935003272c8b6105",
        name: {firstname: "David", lastname: "Nose"},
        role: "alumno",
        email: "david@gmail.com",
        password: "Soycallado123",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6801"
    },
    {
        _id: "600b9852935003272c8b6106",
        name: {firstname: "Eduardo", lastname: "Cortez"},
        role: "alumno",
        email: "edu@gmail.com",
        password: "Trabajomuydur0",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6802"
    },
    {
        _id: "600b9852935003272c8b6107",
        name: {firstname: "Carla", lastname: "Ramirez"},
        role: "alumno",
        email: "carla@gmail.com",
        password: "Yafueusarcontraseña",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6802"
    },
    {
        _id: "600b9852935003272c8b6108",
        name: {firstname: "Andres", lastname: "Garay"},
        role: "alumno",
        email: "andres@gmail.com",
        password: "bastaplz1234",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6802"
    },
    {
        _id: "600b9852935003272c8b6109",
        name: {firstname: "Carlos", lastname: "Castro"},
        role: "alumno",
        email: "carlos@gmail.com",
        password: "nosequeponer1234",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6802"
    },
    {
        _id: "600b9852935003272c8b6110",
        name: {firstname: "Rodrigo", lastname: "Vellido"},
        role: "alumno",
        email: "rodrigo@gmail.com",
        password: "mandalelaRep3",
        cohorte: "600b9852935003272c8b6901",
        standup: "600b9852935003272c8b6802"
    },
    {
        _id: "600b9852935003272c8b6111",
        name: {firstname: "Martina", lastname: "Scomazzon"},
        role: "admin",
        email: "martinan@gmail.com",
        password: "SoyunaTL123",
    },
    {
        _id: "600b9852935003272c8b6112",
        name: {firstname: "Jorge", lastname: "Malo"},
        role: "PM",
        email: "jorgebueno@gmail.com",
        password: "SoyunPM123",
        standup: "600b9852935003272c8b6802"
    },
    {
        _id: "600b9852935003272c8b6113",
        name: {firstname: "Miguel", lastname: "Hernandez"},
        role: "PM",
        email: "miguel@gmail.com",
        password: "SoyotrindePM23",
        standup: "600b9852935003272c8b6802"
    },
    {
        _id: "600b9852935003272c8b6114",
        name: {firstname: "Agus", lastname: "Mineto"},
        role: "PM",
        email: "mineto@gmail.com",
        password: "Cansadodepass1234",
        standup: "600b9852935003272c8b6801"
    },
    {
        _id: "600b9852935003272c8b6115",
        name: {firstname: "Tony", lastname: "Tralice"},
        role: "PM",
        email: "tony@gmail.com",
        password: "contraseñasDuras123",
        standup: "600b9852935003272c8b6801"
    },
    {
        _id: "600b9852935003272c8b6116",
        name: {firstname: "Diego", lastname: "Rodriguez"},
        role: "instructor",
        email: "diego@gmail.com",
        password: "Uruguayo123",
        cohorte: "600b9852935003272c8b6901",
    },
    {
        _id: "600b9852935003272c8b6117",
        name: {firstname: "Agustin", lastname: "Amani"},
        role: "instructor",
        email: "Amani@gmail.com",
        password: "SoyunInstructor123",
        cohorte: "600b9852935003272c8b6902",
    }
]
const groups = [
    {
    _id: "600b9852935003272c8b6802",
    PM: [{User: "600b9852935003272c8b6112"}, {User: "600b9852935003272c8b6113"}],
    Grupo: 1,
    Cohorte: "600b9852935003272c8b6801"
},
    {
    _id: "600b9852935003272c8b6801",
    PM: [{User: "600b9852935003272c8b6114"}, {User: "600b9852935003272c8b6115"}],
    Grupo: 2,
    Cohorte: "600b9852935003272c8b6801"
}
]

const cohortes = [
    {
        _id: "600b9852935003272c8b6901",
        Nombre: "Webft10",
        Start: "8/02/2021",
        Alumnos: 10,
        Instructor: {User: "600b9852935003272c8b6116"},
        Created: "21/01/2021"
    },
    {
        _id: "600b9852935003272c8b6902",
        Start: "1/03/2021",
        Nombre: "Webft11",
        Alumnos: 0,
        Instructor: {User: "600b9852935003272c8b6117"},
        Created: "24/01/2021"
    },
    {
        _id: "600b9852935003272c8b6903",
        Start: "28/05/2020",
        Nombre: "Webft04",
        Alumnos: 150,
        Instructor: {User: "600b9852935003272c8b6117"},
        Created: "20/03/2020",
        Active: false
    },
]

    users.forEach(async c =>  {
      await User.create(c)
    })
    groups.forEach(async c => {
        await Group.create(c)
    })
    cohortes.forEach(async c => {
        await Cohorte.create(c)
    })
    console.log("Insert completo")
}


