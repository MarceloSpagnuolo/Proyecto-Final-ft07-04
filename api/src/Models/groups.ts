import mongoose, { Schema } from "mongoose";

const SantdUpSchema: Schema = new Schema({
    PM: [{_id: false, User: {type: Schema.Types.ObjectId, ref: 'User' }}],
    Grupo: Number,
    Cohorte : [{ type: Schema.Types.ObjectId, ref: 'Cohorte' }]
});

const Standup = mongoose.model("Group", SantdUpSchema);

export default Standup