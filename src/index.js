import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/user.route.js';
import voteRouter from './routes/vote.route.js';

// Configuración para __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Servir archivos estáticos según tu estructura original
app.use(express.static(__dirname)); // Sirve la raíz del proyecto
app.use('/css', express.static(path.join(__dirname, 'css'))); // Ruta para los estilos
app.use('/scripts', express.static(path.join(__dirname, 'scripts'))); // Ruta para los scripts

// Rutas API existentes
app.use('/api/users', userRouter);
app.use('/api/votes', voteRouter);

// Rutas para servir tus archivos HTML manteniendo la estructura
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'registro.html'));
});

app.get('/navbar', (req, res) => {
  res.sendFile(path.join(__dirname, 'navbar.html'));
});

// Manejador básico de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});