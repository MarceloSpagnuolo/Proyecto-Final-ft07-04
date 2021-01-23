// const { Router } = require("express");
import {Router} from "express"
import userRoute from "./user"
import groupRoute from "./groups"

const router = Router();

// Routeo de las rutas segun el modelo
router.use("/users", userRoute)
router.use("/standup", groupRoute)


// module.exports = router;
export default router;