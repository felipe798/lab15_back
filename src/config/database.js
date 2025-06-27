const { Sequelize } = require('sequelize');
require('dotenv').config();

// Verificar que existe la variable de entorno
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL no está definida en el archivo .env');
  process.exit(1);
}

console.log('🔍 DATABASE_URL encontrada:', process.env.DATABASE_URL ? 'Sí' : 'No');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    console.log('🔄 Intentando conectar a PostgreSQL...');
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida');
    
    // Sincronizar modelos (crear tablas automáticamente)
    console.log('🔄 Sincronizando tablas...');
    await sequelize.sync();
    console.log('✅ Tablas sincronizadas');
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };