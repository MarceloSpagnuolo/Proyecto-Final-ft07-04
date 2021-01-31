import mongoose, { Document, Schema } from "mongoose";
import * as bcrypt from "bcrypt";

interface Props extends Document {
  name: any;
  githubId: string;
  googleId: string;
  thumbnail: Buffer;
  role: string;
  github: string;
  email: string;
  password: string;
  created: any;
  cohorte: any;
  standup: any;
  comparePassword(password: string, passwordDB: string): boolean;
}

const UserSchema: Schema<Props> = new Schema({
  name: {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
  },
  githubId: String,
  googleId: String,
  thumbnail: Buffer,
  role: { type: String, default: "alumno" },
  github: { type: String, unique: true },
  email: { type: String, trim: true, unique: true },
  password: { type: String, trim: true },
  created: { type: Date, default: Date.now },
  cohorte: { type: mongoose.Schema.Types.ObjectId, ref: "Cohortes" },
  standup: { type: mongoose.Schema.Types.ObjectId, ref: "Standups" },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

UserSchema.method(
  "comparePassword",
  async function (password: string, passwordDB: string) {
    if (await bcrypt.compareSync(password, passwordDB)) return true;
    return false;
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
