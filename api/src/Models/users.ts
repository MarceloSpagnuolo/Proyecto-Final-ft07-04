import mongoose from "mongoose";
import bcrypt from "bcrypt";

var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    pairprograming: [ { type: mongoose.Schema.Types.ObjectId, ref: "PairProgramins" } ],
});

UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
});

UserSchema.methods.compare = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model("Users", UserSchema);