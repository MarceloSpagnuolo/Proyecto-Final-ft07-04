import express from "express";
const router = express.Router();
import Historial from "../Models/historial";
import User from "../Models/users";
import Modulos from "../Models/modulos";

//Ruta que genera el historial del alumno cuando se registra
//O agrega un nuevo cohorte a su historia cuando migra
router.post("/", async (req, res) => {
    const { userId, cohorteId } = req.body;
    console.log(userId, cohorteId);

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

export default router;