import mongoose from 'mongoose';

const cajaSchema = new mongoose.Schema({
    consecutivo: { type: Number, required: true, unique: true },
    tipoCaja: { type: String, required: true },
    creado: { type: Date, default: Date.now },
    tipoMoneda: [
        {
            valor: { type: String, required: true },
            cantidad: { type: Number, required: true },
        }
    ],
    totalCaja: { type: Number, required: true }
});


const Caja = mongoose.model('Caja', cajaSchema);

export default Caja;
