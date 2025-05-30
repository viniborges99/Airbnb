import express from 'express';
import 'dotenv/config';
import UserRoutes from './domains/users/routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use('/users', UserRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
