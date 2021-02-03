import mongoose, { Schema } from "mongoose";

const CohorteSchema: Schema = new Schema({
  Nombre: String,
  Start: String || Date,
  Alumnos: { type: Number, default: 0 },
  Instructor: {
    _id: false,
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  Created: { type: Date || String, default: Date.now },
  Active: {
    type: Boolean,
    default: true,
  },
  Checkpoints: {
    CP1: {
      totalTests: { type: Number, default: 17 },
      testsReq: { type: Number, default: 11 },
    },
    CP2: {
      totalTests: { type: Number, default: 45 },
      testsReq: { type: Number, default: 35 },
    },
    CP3: {
      totalTests: { type: Number, default: 29 },
      testsReq: { type: Number, default: 19 },
    },
    CP4: {
      totalTests: { type: Number, default: 42 },
      testsReq: { type: Number, default: 28 },
    },
  },
});

const Cohorte = mongoose.model("Cohorte", CohorteSchema);

export default Cohorte;
