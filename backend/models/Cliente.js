import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    nombre: { type: String  },
    productos: [
        {
            productoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
            },
            cantidad: {
                type: Number,
                required: true,
                min: 1
            },
            valorTotal: {
                type: Number,
                required: true
            }
        }
    ],
    localId: { type: mongoose.Schema.Types.ObjectId, ref: 'Local', required: true },
    creado: { type: Date, default: Date.now }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
