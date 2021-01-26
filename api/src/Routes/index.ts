// const { Router } = require("express");
import {Router} from "express"
import userRoute from "./user"
import groupRoute from "./groups"
import cohorteRoute from "./cohortes"
import mailRoute from "./mailgun"

const router = Router();

// Routeo de las rutas segun el modelo
router.use("/users", userRoute)
router.use("/standup", groupRoute)
router.use("/cohorte", cohorteRoute)
router.use('/mails', mailRoute)


// module.exports = router;
export default router;