const Medico = require('../models/Medico');
const Receta = require('../models/Receta');

const medicoController = {
  // Obtener todos
  async getAll(req, res) {
    try {
      const medicos = await Medico.findAll({
        order: [['CodMedico', 'ASC']],
        include: [{
          model: Receta,
          as: 'recetas',
          attributes: ['CodReceta', 'nombrePaciente', 'fechaEmision', 'estado']
        }]
      });
      res.json(medicos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener por ID
  async getById(req, res) {
    try {
      const medico = await Medico.findByPk(req.params.id, {
        include: [{
          model: Receta,
          as: 'recetas'
        }]
      });
      if (!medico) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }
      res.json(medico);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear
  async create(req, res) {
    try {
      const medico = await Medico.create(req.body);
      res.status(201).json(medico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar
  async update(req, res) {
    try {
      const [updated] = await Medico.update(req.body, {
        where: { CodMedico: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }

      const medico = await Medico.findByPk(req.params.id);
      res.json(medico);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar
  async delete(req, res) {
    try {
      const deleted = await Medico.destroy({
        where: { CodMedico: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Médico no encontrado' });
      }

      res.json({ message: 'Médico eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = medicoController;