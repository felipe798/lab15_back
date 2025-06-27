const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DetalleOrdenCompra = sequelize.define('DetalleOrdenCompra', {
  CodOrdenCompra: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  montoPres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  }
}, {
  tableName: 'DetalleOrdenCompra',
  timestamps: false
});

module.exports = DetalleOrdenCompra;