import mongoose, { Schema } from "mongoose";

const CohorteSchema: Schema = new Schema({
    Nombre: String,
    Start: String || Date,
    Alumnos: {type: Number, default: 0},
    Instructor: [
      { _id: false, User: { type: Schema.Types.ObjectId, ref: "User" } },
    ],
    Created: String || Date,
    Active: {
      type: Boolean,
      default: true,
    },
  });

const Cohorte = mongoose.model("Cohorte", CohorteSchema);

export default Cohorte;

