import express from "express";
const router = express.Router();
import User from "../Models/users";
const cors = require('cors')

router.use(cors());

router.post('/', async (req, res)=>{

    const {email, password}= req.body;

    try {
        //revisar sea un usuario registrado
        let usuario = await User.findOne({email});
        if(!usuario) {
            return res.status(401).json({msg: 'El usuario no existe'});
        }
        
        //revisar password
        const user = new User();
        const result = await user.comparePassword(password, usuario.password)
        if (!result) {
            return res.status(401).json({msg:'Password incorrecto'}) 
        }

        //si todo esta bien retornamos el usuario
        res.status(200).json({isLogged:result,user:usuario})

    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, msg:'Hubo un error'})
    }

})



export default router;