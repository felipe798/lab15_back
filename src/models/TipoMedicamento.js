const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TipoMedicamento = sequelize.define('TipoMedicamento', {
  CodTipoMed: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionTipo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'TipoMedicamento',
  timestamps: false
});

module.exports = TipoMedicamento;