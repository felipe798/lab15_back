const TipoMedicamento = require('./TipoMedicamento');
const Medicamento = require('./Medicamento');
const Medico = require('./Medico');
const Receta = require('./Receta');

// Relaciones entre las tablas
const setupAssociations = () => {
  // TipoMedicamento tiene muchos Medicamentos
  TipoMedicamento.hasMany(Medicamento, {
    foreignKey: 'CodTipoMed',
    as: 'medicamentos'
  });

  // Medicamento pertenece a un TipoMedicamento
  Medicamento.belongsTo(TipoMedicamento, {
    foreignKey: 'CodTipoMed',
    as: 'tipoMedicamento'
  });

  // Medico tiene muchas Recetas
  Medico.hasMany(Receta, {
    foreignKey: 'CodMedico',
    as: 'recetas'
  });

  // Receta pertenece a un Medico
  Receta.belongsTo(Medico, {
    foreignKey: 'CodMedico',
    as: 'medico'
  });

  // Medicamento tiene muchas Recetas
  Medicamento.hasMany(Receta, {
    foreignKey: 'CodMedicamento',
    as: 'recetas'
  });

  // Receta pertenece a un Medicamento
  Receta.belongsTo(Medicamento, {
    foreignKey: 'CodMedicamento',
    as: 'medicamento'
  });
};

module.exports = { setupAssociations };