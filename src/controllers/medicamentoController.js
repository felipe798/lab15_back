const Medicamento = require('../models/Medicamento');

const medicamentoController = {
  // Obtener todos - SÚPER FÁCIL!
  async getAll(req, res) {
    try {
      const medicamentos = await Medicamento.findAll({
        order: [['CodMedicamento', 'ASC']]
      });
      res.json(medicamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener por ID - SÚPER FÁCIL!
  async getById(req, res) {
    try {
      const medicamento = await Medicamento.findByPk(req.params.id);
      if (!medicamento) {
        return res.status(404).json({ error: 'Medicamento no encontrado' });
      }
      res.json(medicamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear - SÚPER FÁCIL!
  async create(req, res) {
    try {
      const medicamento = await Medicamento.create(req.body);
      res.status(201).json(medicamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar - SÚPER FÁCIL!
  async update(req, res) {
    try {
      const [updated] = await Medicamento.update(req.body, {
        where: { CodMedicamento: req.params.id },
        returning: true
      });
      
      if (!updated) {
        return res.status(404).json({ error: 'Medicamento no encontrado' });
      }
      
      const medicamento = await Medicamento.findByPk(req.params.id);
      res.json(medicamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar - SÚPER FÁCIL!
  async delete(req, res) {
    try {
      const deleted = await Medicamento.destroy({
        where: { CodMedicamento: req.params.id }
      });
      
      if (!deleted) {
        return res.status(404).json({ error: 'Medicamento no encontrado' });
      }
      
      res.json({ message: 'Medicamento eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = medicamentoController;