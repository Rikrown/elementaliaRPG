import express from 'express';
import skillRoutes from './routes/skills.js';

// Banco de dados que contém TODAS (sim TODAS) as habilidades

const app = express();
app.use(express.json());

app.use('/skills', skillRoutes);

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});


//histórico de rolagens
import rollRoutes from './routes/roll.js';

app.use('/roll', rollRoutes);

