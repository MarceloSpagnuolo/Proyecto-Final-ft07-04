// const { Router } = require("express");
import {Router} from "express"
import userRoute from "./user"
import groupRoute from "./groups"
import cohorteRoute from "./cohortes"

const router = Router();

// Routeo de las rutas segun el modelo
router.use("/users", userRoute)
router.use("/standup", groupRoute)
router.use("/cohorte", cohorteRoute)


// module.exports = router;
export default router;