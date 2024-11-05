// models/Mesa.js
import mongoose from "mongoose";
const mesaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  estado: { type: String },
  piso: { type: mongoose.Schema.Types.ObjectId, ref: "Piso", required: true },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
      },
      cantidad: {
        type: Number,
      },
      valorTotal: {
        type: Number,
      },
    },
  ],
});

const Mesa = mongoose.model("Mesa", mesaSchema);
export default Mesa;
