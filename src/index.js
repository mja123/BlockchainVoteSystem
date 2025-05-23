import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import voteRouter from './routes/vote.route.js';


const app = express();
const port = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rutas API existentes
app.use('/api/users', userRouter);
app.use('/api/votes', voteRouter);


// Manejador básico de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});