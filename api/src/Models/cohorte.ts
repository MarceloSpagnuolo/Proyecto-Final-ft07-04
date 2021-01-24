import mongoose, { Schema } from "mongoose";

const CohorteSchema: Schema = new Schema({
    Start: String || Date,
    Alumnos: Number,
    Instructor: [{_id: false, User: {type: Schema.Types.ObjectId, ref: 'User' }}],
    Created: String || Date, 
});

const Cohorte = mongoose.model("Cohorte", CohorteSchema);

export default Cohorte