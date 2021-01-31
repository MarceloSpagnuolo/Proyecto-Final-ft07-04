import express from "express";
const router = express.Router();
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, path.join(__dirname, "../ArchivosMulter"))
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage});




router.post("/subirArchivo", upload.single('file'), async (req, res) => {
    res.send("todo oki");
})



export default router;
