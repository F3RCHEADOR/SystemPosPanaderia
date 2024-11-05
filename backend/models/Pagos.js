import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  consecutivo: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      nombreProducto: {
        type: String,
        required: true,
      },
      cantidad: { type: Number, required: true },
      valorTotal: { type: Number, required: true },
    },
  ],
  valorTotal: { type: Number, required: true },
  localId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Local",
    required: true,
  },
  creado: { type: Date, default: Date.now },
});

const Pago = mongoose.model("Pago", pagoSchema);

export default Pago;
