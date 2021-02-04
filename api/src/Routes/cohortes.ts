import express from "express";
const router = express.Router();
import Cohorte from "../Models/cohorte";
import User from "../Models/users";

//TRAE TODOS LOS COHORTES
router.get("/", async (req, res) => {
  const result = await Cohorte.find().sort({Nombre: 1});

  !result ? res.send("hubo un error").status(400) : res.json(result);
});

//SE CREA UN COHORTE.
//Cualquier dato que no se pase, queda como vacío en la colección.
router.post("/", async (req, res) => {
  const { fechaInicio, Nombre } = req.body;

  const fecha = fechaInicio.substr(8,2)+"/"+
    fechaInicio.substr(5,2)+"/"+
    fechaInicio.substr(0,4)

  const cohorte = new Cohorte({
    Nombre, 
    Start: fecha
  });
  cohorte.save();

  !cohorte ? res.send("Hubo un error").status(400) : res.json(cohorte);
});

//ACTUALIZA UN COHORTE
//Se pide que pasen todos los datos, incluso los que no quieren actualizar.
// La actualización de instructor se hace en otra ruta por ser más complicado.
//PD: de Marcelo, no hay que pasar todos los datos, solo los que se quieren updatear
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const cohorte = await Cohorte.findByIdAndUpdate(id, req.body);

  !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte);
});

//ACTUALIZA UN INSTRUCTOR
//Se debe pasar el ID de la colección y el ID del Instructor nuevo.
router.put("/Instructor", async (req, res) => {
  const { id, Instructor } = req.body;
  const cohorte = await Cohorte.findOneAndUpdate(
    { _id: id },
    { Instructor: Instructor }
  );

  !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte);
});

//BORRA UN COHORTE ENTERO
router.delete("/", async (req, res) => {
  const { id } = req.body;

  const cohorte = await Cohorte.findOneAndDelete({ _id: id });

  !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte);
});

// BORRA UN INSTRUCTOR DEL COHORTE
// Se debe pasar el ID del INSTRUCTOR a borrar más el ID De la colección donde se encuentra el mismo.
router.delete("/Instructor", async (req, res) => {
  const { id } = req.body;
  const cohorte = await Cohorte.findOneAndUpdate(
    { _id: id },
    { Instructor: null }
  );

  !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte);
});

// Ruta que devuelve los cohortes activos o no segun el parametro recibido con los datos completos de su instructor
router.get("/active/:estado", async (req, res) => {
  const { estado } = req.params;
  await Cohorte.find({ Active: estado }, function (err, cohortes) {
    User.populate(cohortes, { path: "Instructor" }, function (err, completo) {
      completo ? res.json(completo) : res.send(err).status(400);
    });
  }).sort({Nombre: 1});
});

// Devuelve un cohorte especifico con su instructor asociado
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await Cohorte.find({_id: id }, function (err, cohorte) {
    User.populate(cohorte, { path: "Instructor"}, function (err, completo) {
      completo ? res.json(completo) : res.send(err).status(400);
    });
  });
});

//Devuelve true si el nombre de un cohorte ya existe o false si no existe
router.get("/nombre/:nombre", async (req, res) => {
  const { nombre } = req.params;
  var cohorte
  if (nombre) {
    cohorte = await Cohorte.findOne({Nombre: nombre});
  }
  cohorte !== null ? res.send(true).status(200) : res.send(false).status(200);
})

//Devuelve el nombre de un cohorte
router.get("/CohorteName/:id", async(req, res) => {
  const { id } = req.params;
  const cohorte = Cohorte.findOne({_id: id})

  !cohorte ? res.sendStatus(400) : res.send(cohorte.Nombre)
})

router.get("/CohortesNames/:id", async (req, res) => {
  const { id } = req.params

  const result = await Cohorte.find({_id: id})

  !result ? res.send("hubo un error").status(400) : res.json(result);
});

export default router;
