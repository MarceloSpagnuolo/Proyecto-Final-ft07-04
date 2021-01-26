import express from "express";
// import Registro from "../MailModel/Registro"
const router = express.Router();
const XLSX = require("xlsx");



router.post('/', (req,res) => {
    const {file, email, msj} = req.body;
    console.log(req.body, "soy el body en back")
    console.log(file, email, msj, "soy la data en back")

    const excel = XLSX.readFile(file); //lee el archivo
    console.log(excel, "soy el archivo excel")
    var hojas = excel.SheetNames; //devuelve un array con el contenido de cada hoja [{}, {0bj2}, {obj3}]
    console.log(hojas, "soy las hojas del archivo")
    let datos = XLSX.utils.sheet_to_json(excel.Sheets[hojas[0]]);
    console.log(datos, "soy el json del archivo")

    // Registro(email)
    
    res.sendStatus(200)

})

export default router;