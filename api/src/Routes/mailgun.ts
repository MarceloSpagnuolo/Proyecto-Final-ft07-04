import express from "express";
import Registro from "../MailModel/Registro";
const router = express.Router();





router.post('/', async (req, res, next) => {
    const { file, email, msj, cohorte } = req.body;
    try {
        if (file) {
            file[0].data.map((elem: any) => {
                Registro(elem.EMAIL, msj, cohorte)
            })
            if (email) {
                Registro(email, msj, cohorte)
            }
        } else {
            Registro(email, msj, cohorte)

        }

        res.sendStatus(200)
    } catch (e) {
        res.send(e).status(400);
    }



})

export default router;