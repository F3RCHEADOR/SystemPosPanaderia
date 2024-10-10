import mongoose from 'mongoose';

const LocalSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    planSuscripcion: { type: String, required: true },
    activo: { type: Boolean, default: true },
    creadoEn: { type: Date, default: Date.now },
});

const Local = mongoose.model('Local', LocalSchema);
export default Local;
