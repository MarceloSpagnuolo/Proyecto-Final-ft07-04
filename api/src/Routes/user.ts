import express from "express"
const router = express.Router();
// const User = require('../Models/users.ts');
import User from "../Models/users"

router.get('/', (req, res) => {
    console.log("entre aca")
    User.find((err: any, users: any) => {
        console.log(users);
    });
    res.json({
        status: 'API Works!'
    })
})

export default router