// models/Piso.js
import mongoose from "mongoose";

const pisoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    localId: { type: mongoose.Schema.Types.ObjectId, ref: 'Local', required: true }
});

const Piso = mongoose.model('Piso', pisoSchema);
export default Piso;
