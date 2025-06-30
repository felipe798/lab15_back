const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Receta = sequelize.define('Receta', {
  CodReceta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CodMedico: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medico',
      key: 'CodMedico'
    }
  },
  CodMedicamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medicamento',
      key: 'CodMedicamento'
    }
  },
  nombrePaciente: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  apellidoPaciente: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fechaEmision: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dosificacion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  instrucciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precioUnitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(20),
    defaultValue: 'pendiente' // pendiente, entregado, cancelado
  }
}, {
  tableName: 'Receta',
  timestamps: false
});

module.exports = Receta;