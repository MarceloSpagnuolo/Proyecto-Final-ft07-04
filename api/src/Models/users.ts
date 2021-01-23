import mongoose, { Document, Schema } from "mongoose";
import * as bcrypt from "bcrypt";

interface Props extends Document {
    name: any,
    facebookId: string,
    googleId: string,
    thumbnail: Buffer,
    role: string,
    email: string,
    password: string,
    created: any,
    cohorte: any,
    standup: any,
    pairprograming: any,
}


const UserSchema: Schema<Props> = new Schema({
    name: {
        firsname: { type: String, required: true },
        lastname: { type: String, required: true }
    },
    facebookId: String,
    googleId: String,
    thumbnail: Buffer,
    role: String,
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
    cohorte: { type: mongoose.Schema.Types.ObjectId, ref: "Cohortes" },
    standup: { type: mongoose.Schema.Types.ObjectId, ref: "Standups" },
    pairprograming: [{ type: mongoose.Schema.Types.ObjectId, ref: "PairProgramins" }],
});

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
});

UserSchema.method('comparePassword', function (password: string): boolean {
    if (bcrypt.compareSync(password, this.password)) return true;
    return false;
});

export default mongoose.model("Users", UserSchema);