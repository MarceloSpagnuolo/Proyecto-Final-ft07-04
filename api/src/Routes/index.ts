// const { Router } = require("express");
import {Router} from "express"
import userRoute from "./user"
import groupRoute from "./groups"
import cohorteRoute from "./cohortes"

import mailgunRoute from "./mailgun"
import authRoute from "./auth"

const router = Router();

// Routeo de las rutas segun el modelo
router.use("/users", userRoute)
router.use("/standup", groupRoute)
router.use("/cohorte", cohorteRoute)

router.use("/mails", mailgunRoute)
router.use("/auth", authRoute)


// module.exports = router;
export default router;