import express from "express";
import Registro from "../MailModel/Registro"
const router = express.Router();
const XLSX = require("xlsx");



router.post('/', (req,res) => {
    const {file, email} = req.body;

    const excelToJSON = () => {
        const excel = XLSX.readFile(file); //lee el archivo
        var hojas = excel.SheetNames; //devuelve un array con el contenido de cada hoja [{}, {0bj2}, {obj3}]

        let datos = XLSX.utils.sheet_to_json(excel.Sheets[hojas[0]]);


    }
    Registro(email)
    
    res.sendStatus(200)

})

export default router;