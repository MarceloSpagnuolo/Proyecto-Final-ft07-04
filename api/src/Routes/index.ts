// const { Router } = require("express");
import {Router} from "express"
import userRoute from "../Routes/user"

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
// router.use("/products", productRouter);
router.use("/users", userRoute)


// module.exports = router;
export default router;