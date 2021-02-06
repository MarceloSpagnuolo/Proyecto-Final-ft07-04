import mongoose, { Schema } from "mongoose";

const ModuloSchema: Schema = new Schema ({
    Numero: Number,
    Clases: [
        {
            _id: false,
            Nombre: String,
            Asistencia: { type: Boolean, default: false },
            Participa: { type: Number, default: 0 }
        }
    ]
});

const Modulos = mongoose.model("Modulos", ModuloSchema);

export default Modulos;