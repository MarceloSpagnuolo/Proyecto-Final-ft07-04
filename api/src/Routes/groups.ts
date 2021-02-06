import express from "express";
const router = express.Router();
import Group from "../Models/groups";
import User from "../Models/users"

//TRAE TODOS LOS STANDUP
router.get("/", async (req, res) => {
  const result = await Group.find().sort({Grupo: 'asc'});

  !result ? res.send("Hubo un error").status(400) : res.json(result);
});

router.get("/byCohorte/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Group.find({ Cohorte: id }).sort({Grupo: 'asc'});;

  !result ? res.send("Hubo un error").status(400) : res.json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await Group.find({ _id: id }).sort({Grupo: 'asc'});;

  !result ? res.send("Hubo un error").status(400) : res.json(result);
});

//CREA UN STANDUP
//Por ahora se pide que se pasen todos los datos.
//Si no se pasa valor de PM1 o PM2, el mismo deja un espacio vacío en el array.
router.post("/", async (req, res) => {
  const { PM1, PM2, NumeroGrupo, CohorteId } = req.body;
  const group = new Group({
    Grupo: NumeroGrupo,
    Cohorte: CohorteId,
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

  group.PM.set(index, PM);
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
      $push: { PM: [PM] },
    },
    { upsert: true }
  );
  await User.findOneAndUpdate(
    {_id: PM},
    {
      standup: id
    },
    {upsert: true}
  )

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

//BORRA UN STANDUP
//Se pide el ID de la colección a borrar.
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const group = await Group.findOneAndDelete({ _id: id });

  !group ? res.send("hubo un error").status(400) : res.json(group);
});

// BORRA UN PM DEL STANDUP
// Se debe pasar el ID del PM a borrar más el ID De la colección donde se encuentra el mismo.
router.delete("/PM/:id/:PM", async (req, res) => {
  const { id, PM } = req.params;
  const group = await Group.findById(id);
  group.PM.pull(PM);
  group.save();
  const user = await User.findByIdAndUpdate(PM, { standup: null })
  user.save();

  !group ? res.send("hubo un error").status(400) : res.json(group);
});


//DEVUELVE EL STANDUP AL QUE PERTENECE EL PM
//RECIBE EL ID DEL PM
router.get("/search/:pmId", async (req, res) => {
  const { pmId } = req.params;

  await Group.findOne({ PM: pmId}, function (err: any, standup: any) {
    User.populate(standup, { path: "PM"}, function (err: any, standupCOM: any) {
      err ? res.send(err).status(400) : res.json(standupCOM);    })
  });

})
export default router;
