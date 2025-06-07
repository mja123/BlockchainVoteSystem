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

/*
TODO:
- Add vote id (maybe hash)
- After vote, update hash to user
- Modify chaincode column names (and in update user vote)
- Validate user exists and doesn't vote before
- Persist blockchain data in volumes
- Add validations
- Modify cwd refernces to relative paths from root project

TODO chicos:
- En dashboard, que no se pueda entrar si no está logueado (email en localstorage)
- Para votar, pasar email (localstorage) y candidato (del form)
- Luego de que se vote, llamar a GET /api/votes para recibir todos los votos y actualizar el dashboard
- En base a las respuestas del backend (status codes), manejar los errores
- Agregar un gráfico de torta de como vienen los votos (opcional)
*/

