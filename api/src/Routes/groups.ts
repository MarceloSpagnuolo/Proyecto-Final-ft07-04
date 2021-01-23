import express from "express"
const router = express.Router();
// const User = require('../Models/users.ts');
import Group from "../Models/groups"

router.get('/', async (req, res) => {
    const result = await Group.find();

    !result ? res.send("Hubo un error").status(400) : res.json(result)
})

router.post('/', async (req, res) => {
    const {PM1, PM2, NumeroGrupo, CohorteId} = req.body
    const group = new Group({
        PM: [{User: PM1}, {User: PM2}],
        Grupo: NumeroGrupo,
        Cohorte: [CohorteId],
    })
    group.save()
    console.log(group)

    !group ? res.send("hubo un error").status(400) : res.json(group)
})

router.put('/', async(req, res) => {
    const {id, PM1, PM2, NumeroGrupo, CohorteId} = req.body
    const group = await Group.findOneAndUpdate(
        {_id: id},
        {
            PM: [{User: PM1}, {User: PM2}],
            Grupo: NumeroGrupo,
            Cohorte: [CohorteId],
        },
        {upsert: true}
        )

        !group ? res.send("hubo un error").status(400) : res.json(group)
})

router.delete('/', async(req,res) => {
    const {id} = req.body;
    const group = await Group.findOneAndDelete({_id: id})

    !group ? res.send("hubo un error").status(400) : res.json(group)
})

export default router;