import mongoose, { Document, Schema } from "mongoose";
import users from "./users";

const SantdUpSchema: Schema = new Schema({
    PM: [{_id: false, User: {type: Schema.Types.ObjectId, ref: 'User' }}],
    Grupo: Number,
    Cohorte : [{ type: Schema.Types.ObjectId, ref: 'Cohorte' }]
});

const modelito = mongoose.model("Group", SantdUpSchema);

export default modelito

// {
//     _id:false,
//     field :{type:String}
//  }