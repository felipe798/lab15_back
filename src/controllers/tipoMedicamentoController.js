const TipoMedicamento = require('../models/TipoMedicamento');
const Medicamento = require('../models/Medicamento');

const tipoMedicamentoController = {
  // Obtener todos los tipos
  async getAll(req, res) {
    try {
      const tipos = await TipoMedicamento.findAll({
        order: [['CodTipoMed', 'ASC']],
        include: [{
          model: Medicamento,
          as: 'medicamentos',
          attributes: ['CodMedicamento', 'descripcionMed']
        }]
      });
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener por ID
  async getById(req, res) {
    try {
      const tipo = await TipoMedicamento.findByPk(req.params.id, {
        include: [{
          model: Medicamento,
          as: 'medicamentos'
        }]
      });
      if (!tipo) {
        return res.status(404).json({ error: 'Tipo de medicamento no encontrado' });
      }
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear
  async create(req, res) {
    try {
      const tipo = await TipoMedicamento.create(req.body);
      res.status(201).json(tipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar
  async update(req, res) {
    try {
      const [updated] = await TipoMedicamento.update(req.body, {
        where: { CodTipoMed: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Tipo de medicamento no encontrado' });
      }

      const tipo = await TipoMedicamento.findByPk(req.params.id);
      res.json(tipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar
  async delete(req, res) {
    try {
      const deleted = await TipoMedicamento.destroy({
        where: { CodTipoMed: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Tipo de medicamento no encontrado' });
      }

      res.json({ message: 'Tipo de medicamento eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = tipoMedicamentoController;