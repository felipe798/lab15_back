const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar asociaciones
const { setupAssociations } = require('./models/associations');

// Importar rutas
const medicamentosRoutes = require('./routes/medicamentos');
const tipoMedicamentosRoutes = require('./routes/tipoMedicamentos');
const medicosRoutes = require('./routes/medicos');
const recetasRoutes = require('./routes/recetas');

const app = express();

// Configurar asociaciones entre modelos
setupAssociations();

// Configuración de CORS para desarrollo local
const corsOptions = {
  origin: [
    'http://localhost:3000', // Frontend local
    'https://lab15-xl5y.onrender.com', // Frontend desplegado
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/medicamentos', medicamentosRoutes);
app.use('/api/tipo-medicamentos', tipoMedicamentosRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/recetas', recetasRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    message: 'API de Farmacia funcionando correctamente',
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    endpoints: [
      '/api/medicamentos',
      '/api/tipo-medicamentos', 
      '/api/medicos',
      '/api/recetas'
    ]
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

module.exports = app;
