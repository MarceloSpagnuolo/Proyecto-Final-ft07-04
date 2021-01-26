import express from "express";
const router = express.Router();
import Group from "../Models/groups";


//TRAE TODOS LOS STANDUP
router.get("/", async (req, res) => {
  const result = await Group.find();

  !result ? res.send("Hubo un error").status(400) : res.json(result);
});

//CREA UN STANDUP
//Por ahora se pide que se pasen todos los datos.
//Si no se pasa valor de PM1 o PM2, el mismo deja un espacio vacío en el array.
router.post("/", async (req, res) => {
  const { PM1, PM2, NumeroGrupo, CohorteId } = req.body;

  const group = new Group({
    PM: [{ User: PM1 }, { User: PM2 }],
    Grupo: NumeroGrupo,
    Cohorte: [CohorteId],
  });
  group.save();

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

//HACE UN UPDATE DEL NUMERO DE GRUPO Y DEL COHORTE
//Se hace un update de esos 2 datos ya que el de PM's es más complicado y está en otra ruta
router.put("/", async (req, res) => {
  const { id, NumeroGrupo, CohorteId } = req.body;
  const group = await Group.findOneAndUpdate(
    { _id: id },

    req.body,
    { upsert: true }
  );

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

//Actualiza un PM según el índice de posicionamiento del array (0 == el primero; 1 == el segundo, etc.)
//Se debe pasar el ID de la colección, el ID del PM nuevo y el posicionamiento del Array al cual modificar.
router.put("/PM", async (req, res) => {
  const { id, index, PM } = req.body;
  const group = await Group.findById(id);

  group.PM.set(index, { User: PM });
  group.save();

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

// AGREGA UN PM AL STANDUP SELECCIONADO
// Se pide el ID de la colección a donde agregarlo más el ID del PM a agregar.
// El PM se agrega al final del array de PM's
router.post("/PM", async (req, res) => {
  const { id, PM } = req.body;
  const group = await Group.findOneAndUpdate(
    { _id: id },
    {
      $push: { PM: [{ User: PM }] },
    },
    { upsert: true }
  );

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

//BORRA UN STANDUP
//Se pide el ID de la colección a borrar.
router.delete("/", async (req, res) => {
  const { id } = req.body;
  const group = await Group.findOneAndDelete({ _id: id });

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

// BORRA UN PM DEL STANDUP
// Se debe pasar el ID del PM a borrar más el ID De la colección donde se encuentra el mismo.
router.delete("/PM", async (req, res) => {
  const { id, PM } = req.body;
  const group = await Group.findById(id);

  group.PM.pull({ User: PM });

  group.save();

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

export default router;