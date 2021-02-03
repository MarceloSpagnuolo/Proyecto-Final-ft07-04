import {Router} from "express";
import userRoute from "./user";
import groupRoute from "./groups";
import cohorteRoute from "./cohortes";
import multerRoute from "./multer";
import mailgunRoute from "./mailgun";
import authRoute from "./auth";
import historialRoute from "./historial";

const router = Router();

// Routeo de las rutas segun el modelo
router.use("/users", userRoute);
router.use("/standup", groupRoute);
router.use("/cohorte", cohorteRoute);
router.use('/multer', multerRoute);
router.use("/mails", mailgunRoute);
router.use("/auth/login", authRoute);
router.use("/historia", historialRoute);

// module.exports = router;
export default router;