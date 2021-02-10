import express from "express";
const router = express.Router();
import Historial from "../Models/historial";
import User from "../Models/users";
import Cohorte from "../Models/cohorte";
import Modulos from "../Models/modulos";

//Ruta que genera el historial del alumno cuando se registra
//O agrega un nuevo cohorte a su historia cuando migra
router.post("/", async (req, res) => {
    const { userId, cohorteId } = req.body;

    //Primero nos fijamos si el alumno ya tiene historia
    var alumno = await User.findById(userId);
    if(alumno.historia) {
        //Si ya tiene historia le agregamos un nuevo cohorte (está migrando)
        let historia = await Historial.findById(alumno.historia);
        historia.Checkpoints.push({Cohorte: cohorteId});
        historia.save()
        historia ? res.json(historia) : res.send("No se pudo agregar el cohorte al historia del alumno").status(400);
    } else {
        //Si el alumno no tiene historia generamos la historia (es alumno nuevo)
        const newHistoria = new Historial({ Checkpoints: [{Cohorte: cohorteId}]  });
            newHistoria.save( async function(err, result) {
                err ? res.send(err).status(400) : 
                    //Guardamos el codigo de la historia en alumno
                    alumno = await User.findById(userId, { historia: result._id})
                    !alumno ? res.send("Error al genera historia del alumno").status(400) :
                        res.json(alumno);
            });
    }

  /*   //Primero nos fijamos si la colección tiene algo (en realidad, si esta creada).
    Historial.countDocuments({}, async function(err, count) {
        //Si no existe la colección, creamos el primer documento con los datos recibidos
        if(count === 0) {
            const historia = new Historial({
                User: userId,
                Checkpoints: [{Cohorte: cohorteId}]
            });
            historia.save( function(err, result) {
                err ? res.send(err).status(400) : res.json(result);
            });
        } else {
            //Si ya existe la colección, nos fijamos si el alumno ya existe
            const alumno = await Historial.findOne({User: userId})
            if (alumno) {
                //Si existe le agregamos el nuevo cohorte (es una migracion)
                const historia = await Historial.findOneAndUpdate({ User: userId}, { $push: {Checkpoints: {Cohorte: cohorteId}}});
                historia ? res.json(historia) : res.send("No se puedo agregar el cohorte al historia del alumno").status(400);
            } else {
                //Si no encontramos al alumno, lo agregamos con el cohorte pasado
               const historia = new Historial({
                User: userId,
                Checkpoints: [{Cohorte: cohorteId}]
                });
                historia.save( function(err, result) {
                err ? res.send(err).status(400) : res.json(result);
                }); 
            }
        }
    }); */
});

//Ruta que devuelve todos los historiales de un cohorte recibido por params
router.get("/cohorte/:cohorteId", async (req, res) => {
    const { cohorteId } = req.params;

    await Historial.find({Checkpoints: {Cohorte: cohorteId}}, function(err, historias) {
        User.populate(historias, { path: "User" }, function(err, completas) {
            err ? res.send(err).status(400) : res.json(completas);
        })
    });
});

router.get("/modulos", async (req, res) => {

    const modulos = await Modulos.find();

    modulos ? res.json(modulos) : res.send("No se encontraton módulos").status(400);
})

//// ruta para sacar promedio de participacion //////
router.get("/promedioParticipacion/:grupoId", async (req, res) => {
    const {grupoId} = req.params
    // let promedios1: any[] = []
    // let promedios2: any[] = []
    // let promedios3: any[] = []
    // let promedios4: any[] = []
    // let promediosTotal: any[] = []
    // let suma: number;
    let arr1 = new Array(9)
    let arr2 = new Array(14);
    let arr3 = new Array(8);
    let arr4 = new Array(5);
    let total: any[] = []

    const alumnos = await User.find({$and: [
        {standup: grupoId},
        {role: "alumno"}
    ]}, (err, users) => {
        Historial.populate(users, { path: "historia" }, function (err, usPopulated: any) {
            if(err) return res.sendStatus(400);
            usPopulated.forEach((a: any, index: number) => {
                let is = index == usPopulated.length - 1
                a.historia.Modulos.forEach((c: any, i: number) => {
                    if (i == 0) {
                        c.Clases.forEach((p: any, id: number) => {
                            arr1[id] = isNaN(arr1[id]) ? 0 : arr1[id]
                            arr1[id] += p.Participa
                            arr1[id] = is ? arr1[id] / usPopulated.length : arr1[id]
                            
                            
                        })
                    }
                    if (i == 1) {
                        c.Clases.forEach((p: any, id: number) => {
                            arr2[id] = isNaN(arr2[id]) ? 0 : arr2[id]
                            arr2[id] += p.Participa
                            arr2[id] = is ? arr2[id] / usPopulated.length : arr2[id]
                        })
                    }
                    if (i == 2) {
                        c.Clases.forEach((p: any, id: number) => {
                            arr3[id] = isNaN(arr3[id]) ? 0 : arr3[id]
                            arr3[id] += p.Participa
                            arr3[id] = is ? arr3[id] / usPopulated.length : arr3[id]
                        })
                    }
                    if (i == 3) {
                        c.Clases.forEach((p: any, id: number) => {
                            arr4[id] = isNaN(arr4[id]) ? 0 : arr4[id]
                            arr4[id] += p.Participa
                            arr4[id] = is ? arr4[id] / usPopulated.length : arr4[id]
                        })
                    }
                })
            })

            total.push(arr1, arr2, arr3, arr4)
            res.send(total)
        })
    })

})

router.get("/promedioNotas/:cohorteId", async (req,res) => {
    const {cohorteId} = req.params
    let notas1: number = 0
    let notas2: number = 0
    let notas3: number = 0
    let notas4: number = 0
    let arr1: any[] = []
    let arr2: any[] = []
    let arr3: any[] = []
    let arr4: any[] = []
    let total: any[] = []
    let CP1: any = {
        alumnos: 0,
        aprobados: 0,
        promedio: 0
    }
    let CP2: any = {
        alumnos: 0,
        aprobados: 0,
        promedio: 0
    }
    let CP3: any = {
        alumnos: 0,
        aprobados: 0,        recursantes: 0,
        promedio: 0
    }
    let CP4: any = {
        alumnos: 0,
        aprobados: 0,
        promedio: 0
    }

    const cohorte = await Cohorte.findOne({_id: cohorteId})

    const alumnos = await User.find({$and: [
        {cohorte: cohorteId}
    ]}, (err, users) => {
        Historial.populate(users, { path: "historia" }, function (err, usPopulated: any) {
            if(err) return res.sendStatus(400);

            

            usPopulated.forEach((a: any, index: number) => {


                a.historia.Checkpoints.forEach((c: any, i: number) => {
                    if(c.CP1 > 0){
                        CP1.alumnos++                
                    if(c.CP1 >= cohorte.Checkpoints.CP1.testsReq){
                        arr1.push(c.CP1)
                        CP1.aprobados++
                    }}
                    if(c.CP2 > 0){
                        CP2.alumnos++ 
                    if(c.CP2 >= cohorte.Checkpoints.CP2.testsReq){
                        arr2.push(c.CP2)
                        CP2.aprobados++
                    }}
                    if(c.CP3 > 0){
                        CP3.alumnos++ 
                    if(c.CP3 >= cohorte.Checkpoints.CP3.testsReq){
                        arr3.push(c.CP3)
                        CP3.aprobados++
                    }}
                    if(c.CP4 > 0){
                        CP4.alumnos++ 
                    if(c.CP4 >= cohorte.Checkpoints.CP4.testsReq){
                        arr4.push(c.CP4)
                        CP4.aprobados++
                    }}
                
                })

            })

            arr1.forEach((n: any) => {
                notas1 += n
            })
            arr2.forEach((n: any) => {
                notas2 += n
            })
            arr3.forEach((n: any) => {
                notas3 += n
            })
            arr4.forEach((n: any) => {
                notas4 += n
            })
            notas1 = (Math.floor(notas1 / arr1.length))
            notas2 = (Math.floor(notas2 / arr2.length))
            notas3 = (Math.floor(notas3 / arr3.length))
            notas4 = (Math.floor(notas4 / arr4.length))

            CP1.promedio = notas1
            CP2.promedio = notas2
            CP3.promedio = notas3
            CP4.promedio = notas4

            total = [CP1, CP2, CP3, CP4]


            res.send(total)
        })
    })    
})

export default router;


/////
/*
users.historia.modulos = [1,2,3,4] => 
1 = clases:[14]
2 = clases:[9]
3 = clases:[8]
4 = clases:[5]


*/