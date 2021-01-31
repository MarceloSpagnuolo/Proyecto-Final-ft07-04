import express from "express";
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
import User from "../Models/users";

router.use(passport.initialize())

import { Request } from "express"




require('./passport-config')(passport);

// const cors = require('cors')

// router.use(cors());

router.post('/', (req, res, next) => {

	passport.authenticate("local", { session: false }, (err:any, user:any, info:any) => {
		if (err) throw err;
		if (!user) res.status(400).json({ msg: 'Email o Password incorrecto' })
		else {
			//crear y asignar un token
			res.send(jwt.sign(user, "secreto"));
			
		}
	})(req, res, next);
});




export default router;