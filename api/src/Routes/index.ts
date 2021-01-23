// const { Router } = require("express");
import {Router} from "express"
import userRoute from "./user"

const router = Router();

// Routeo de las rutas segun el modelo
router.use("/users", userRoute)


// module.exports = router;
export default router;