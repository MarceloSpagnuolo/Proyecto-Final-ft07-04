import express from "express";
const router = express.Router();
import Cohorte from "../Models/cohorte";


//TRAE TODOS LOS COHORTES
router.get("/", async (req, res) => {
    const result = await Cohorte.find();

    !result? res.send("hubo un error").status(400) : res.json(result)
})

//SE CREA UN COHORTE.
//Cualquier dato que no se pase, queda como vacío en la colección.
router.post('/', async (req, res) => {

    const {fechaInicio, nroCohorte, Instructor, Created} = req.body;
    console.log(req.body, "SOY EL BODY")

    const cohorte = new Cohorte({
      Nombre: "Webft" + nroCohorte,
        Start: fechaInicio,
        Instructor: [{ User: Instructor }],
        Created,
        Active: true
    })
    cohorte.save()

    !cohorte? res.send("Hubo un error").status(400) : res.json(cohorte)
})
  

//ACTUALIZA UN COHORTE
//Se pide que pasen todos los datos, incluso los que no quieren actualizar.
// La actualización de instructor se hace en otra ruta por ser más complicado.
router.put('/', async (req, res) => {

  const { id } = req.body;

  const cohorte = await Cohorte.findOneAndUpdate({ _id: id },req.body,{ upsert: true });

    !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte)
})

//ACTUALIZA UN INSTRUCTOR
//Actualiza un Instructor según el índice de posicionamiento del array (0 == el primero; 1 == el segundo, etc.)
//Se debe pasar el ID de la colección, el ID del Instructor nuevo y el posicionamiento del Array al cual modificar.
router.put("/Instructor", async (req, res) => {
    const { id, index, Instructor } = req.body;
    const cohorte = await Cohorte.findById(id);
  
    cohorte.Instructor.set(index, { User: Instructor });
    cohorte.save();
  
    !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte);
  });

//BORRA UN COHORTE ENTERO
router.delete('/', async (req, res) => {
    const {id} = req.body

    const cohorte = await Cohorte.findOneAndDelete({ _id: id });

  !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte);
})

// BORRA UN INSTRUCTOR DEL COHORTE
// Se debe pasar el ID del INSTRUCTOR a borrar más el ID De la colección donde se encuentra el mismo.
router.delete("/Instructor", async (req, res) => {
    const { id, Instructor } = req.body;
    const cohorte = await Cohorte.findById(id);
  
    cohorte.Instructor.pull({ User: Instructor });
    cohorte.save();
  
    !cohorte ? res.send("hubo un error").status(400) : res.json(cohorte);
  });

export default router;