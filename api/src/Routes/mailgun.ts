import express from "express";
import Registro from "../MailModel/Registro";
// import Registro from "../MailModel/Registro"
const router = express.Router();
const XLSX = require("xlsx");




router.post('/', async (req, res, next) => {
    const { file, email, msj } = req.body;
    try {
        if (file) {
            var path = __dirname.split("Routes")
            var pathFile = `${path[0]}${file}`

            const excel = await XLSX.readFile(pathFile); //lee el archivo

            var hojas = await excel.SheetNames; //devuelve un array con el contenido de cada hoja [{}, {0bj2}, {obj3}]

            let datos = await XLSX.utils.sheet_to_json(excel.Sheets[hojas[0]]);

            datos.map((elem: any) => {
                Registro(elem.EMAIL, msj)
            })
            if (email) {
                Registro(email, msj)
            }
        } else {
            Registro(email, msj)

        }

        res.sendStatus(200)
    } catch (e) {
        res.send(e).status(400);
    }



})

export default router;