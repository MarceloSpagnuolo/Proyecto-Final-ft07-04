import express from "express";
import Registro from "../MailModel/Registro"
const router = express.Router();


router.post('/', (req,res) => {
    const {email} = req.body;
    Registro(email)
    
    res.sendStatus(200)

})

export default router;