const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fechaFabricacion: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fechaVencimiento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Presentacion: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  precioVentaPres: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  CodTipoMed: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Marca: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  CodOrdenCompra: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  CodEspec: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Medicamento',
  timestamps: false // No usar createdAt/updatedAt
});

module.exports = Medicamento;