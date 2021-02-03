import express from "express";
const router = express.Router();
const multer = require("multer");
const path = require("path");

//multer le asinga un nombre automatico a los archivos sin su extencion ejemplo: ".jpg"
//Con la funcion diskStorage le asignamos el nombre con el que queremos que se guarde
const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, path.join(__dirname, "../ArchivosMulter"))//ruta donde se va a guardar la imagen
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)//le asignamos como nombre a los archivos su nombre original "originalname"
    }
})

const upload = multer({ storage });




router.post("/subirArchivo", upload.single('file'), async (req, res) => {

    res.send("todo oki");
})



export default router;
