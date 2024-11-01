import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  localId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Local",
    required: true,
  },
  creadoEn: { type: Date, default: Date.now },
});

const Categoria = mongoose.model("Categoria", CategoriaSchema);
export default Categoria;
