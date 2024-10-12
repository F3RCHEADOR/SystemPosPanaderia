import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    iva: { type: Number, default: 0 }, // IVA por producto
    categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    localId: { type: mongoose.Schema.Types.ObjectId, ref: 'Local', required: true },
    creadoEn: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', ProductoSchema);
export default Producto;
