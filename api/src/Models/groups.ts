import mongoose, { Document, Schema } from "mongoose";

const SantdUpSchema: Schema = new Schema({
    PM: [{User: [{type: Schema.Types.ObjectId, ref: 'User' }]}, {User: [{type: Schema.Types.ObjectId, ref: 'User' }]}],
    Grupo: Number,
    Cohorte : [{ type: Schema.Types.ObjectId, ref: 'Cohorte' }]
});



export default mongoose.model("Group", SantdUpSchema);