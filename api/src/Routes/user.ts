import express from "express";
const router = express.Router();
import User from "../Models/users";
import Cohorte from "../Models/cohorte";
import Group from "../Models/groups";
import axios from 'axios';




// Trae todos los usuarios
router.get("/", async (req, res) => {
  const result = await User.find();

  !result ? res.send("Hubo un error").status(400) : res.json(result);
});


router.get("/estudiantes", async (req, res) => {

  await User.find({ $or: [{ role: "alumno" }, { role: "PM" }] }, function (err, users) {
    Cohorte.populate(users, { path: "cohorte" }, function (err, usersCH) {
      Group.populate(usersCH, { path: "standup" }, function (err, usersCOM) {
        res.json(usersCOM).status(200);
      })
    });
  });

});

//guardar usuario
// users/register
router.post("/register", async (req, res) => {

  const {
    firstname,
    lastname,
    thumbnail,
    role,
    email,
    password,
    cohorte,
    standup,
  } = req.body;

  try {
    //revisar usuario a registrar sea unico
    let usuario = await User.findOne({ email });
    if (usuario) {
      return res
        .status(400)
        .json({ success: false, msg: "El usuario ya existe" });
    }
    //crear nuevo usuario
    usuario = new User({
      name: { firstname, lastname },
      email,
      password,
      thumbnail,
      role,
    });

    //guardar usuario
    let result = await usuario.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//eliminar usuario
// users/delete/:id
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.deleteOne({ _id: id });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, msg: "Hubo un  error" });
  }
});


// Modificar un usuario por id
router.put('/modify/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate({ _id: id}, req.body);


  if(!user) {
    res.status(404).send("No existe un usuario con ese id");
  } else { res.status(200).json(user); }
});

router.get("/cohorte/:id", async (req, res) => {
  const {id} = req.params
  const usuarios = await User.find({cohorte: id})
  !usuarios ? res.send("hubo un error").status(400) : res.json(usuarios)
})

router.delete("/cohorte/:id", async (req, res) => {
  const {id} = req.params;
  const usuarios = await User.findOneAndUpdate({_id: id}, {cohorte: null})
  !usuarios ? res.send("hubo un error").status(400) : res.json(usuarios)
})

router.put("/cohorte/:id", async (req,res) => {
  const {id} = req.params;
  const {cohorteName} = req.body;
  console.log(req.body)
  const cohorte = await Cohorte.findOne({Nombre: cohorteName})
  console.log(cohorte)
  const usuarios = await User.findOneAndUpdate({_id: id}, {cohorte: cohorte._id})
  !usuarios ? res.send("hubo un error").status(400) : res.json(usuarios)
})

// Ruta para verificar el usuario de GitHub

async function getUser(username : any) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response;
  }
  catch (error) {
    //console.error(error);
  }
}


router.get('/github/:username', async(req, res) => {
  let { username }  = req.params;
  let userStatus : any = await getUser(username);
  //console.log(userStatus);
  (userStatus === undefined) ? res.send(false) : res.send(true);
})

// Ruta para buscar un usuario por nombre y apellido (req.body)

router.get('/name', async (req, res) => {
  const { name } = req.body;
  const firstname : string = name.firstname;
  const lastname : string = name.lastname; 
  const user = await User.find({name: { firstname, lastname}});
  !user ? res.send('Hubo un error') : res.json(user); 

});

// Ruta para buscar un usuario por nombre y apellido (queryStrings)

router.get('/?firstname&lastname', async (req, res) => {
  const { firstname, lastname } = req.query; 
  // const firstname : string = name.firstname;
  // const lastname : string = name.lastname; 
  const user = await User.find({name: { firstname, lastname}});
  !user ? res.send('Hubo un error') : res.json(user); 

});

// Ruta para buscar usuario por id

router.get('/:id', async (req, res) =>{
  const { id } = req.params;
  const user = await User.find({_id: id});
  !user ? res.send('Hubo un problema') : res.json(user);
})

export default router;
