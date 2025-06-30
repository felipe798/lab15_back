const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Medico = sequelize.define('Medico', {
  CodMedico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  numeroColegioMedico: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING(20),
    defaultValue: 'activo'
  }
}, {
  tableName: 'Medico',
  timestamps: false
});

module.exports = Medico;