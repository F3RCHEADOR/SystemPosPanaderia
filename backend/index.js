import express from 'express';
import cors from 'cors';
import clientesRoutes from './controllers/clientesController.js';
import mesasRoutes from './controllers/mesasController.js'; // Importa el nuevo controlador

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);
app.use('/api/mesas', mesasRoutes); // Usa el controlador de mesas

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
