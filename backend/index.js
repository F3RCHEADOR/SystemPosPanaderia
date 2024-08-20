import express from 'express';
import cors from 'cors';
import clientesRoutes from './controllers/clientesController.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
