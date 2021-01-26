import express from "express";
const router = express.Router();
import User from "../Models/users";

router.get("/", (req, res) => {
  User.find((err: any, users: any) => {});
  res.json({
    status: "API Works!",
  });
});

//guardar usuario
// users/register
router.post("/register", async (req, res) => {
  const { firstname, lastname, thumbnail, role, email, password } = req.body;

  console.log(req.body, "soy el user del back");

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

export default router;
