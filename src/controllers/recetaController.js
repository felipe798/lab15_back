const Receta = require('../models/Receta');
const Medico = require('../models/Medico');
const Medicamento = require('../models/Medicamento');
const TipoMedicamento = require('../models/TipoMedicamento');

const recetaController = {
  // Obtener todas las recetas
  async getAll(req, res) {
    try {
      const recetas = await Receta.findAll({
        order: [['fechaEmision', 'DESC']],
        include: [
          {
            model: Medico,
            as: 'medico',
            attributes: ['CodMedico', 'nombre', 'apellido', 'especialidad', 'numeroColegioMedico']
          },
          {
            model: Medicamento,
            as: 'medicamento',
            attributes: ['CodMedicamento', 'descripcionMed', 'Presentacion', 'Marca'],
            include: [{
              model: TipoMedicamento,
              as: 'tipoMedicamento',
              attributes: ['descripcionTipo', 'categoria']
            }]
          }
        ]
      });
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener receta por ID
  async getById(req, res) {
    try {
      const receta = await Receta.findByPk(req.params.id, {
        include: [
          {
            model: Medico,
            as: 'medico'
          },
          {
            model: Medicamento,
            as: 'medicamento',
            include: [{
              model: TipoMedicamento,
              as: 'tipoMedicamento'
            }]
          }
        ]
      });
      if (!receta) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }
      res.json(receta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener recetas por médico
  async getByMedico(req, res) {
    try {
      const recetas = await Receta.findAll({
        where: { CodMedico: req.params.codMedico },
        order: [['fechaEmision', 'DESC']],
        include: [
          {
            model: Medico,
            as: 'medico'
          },
          {
            model: Medicamento,
            as: 'medicamento',
            include: [{
              model: TipoMedicamento,
              as: 'tipoMedicamento'
            }]
          }
        ]
      });
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear receta
  async create(req, res) {
    try {
      // Calcular el subtotal
      const subtotal = req.body.cantidad * req.body.precioUnitario;
      const recetaData = { ...req.body, subtotal };
      
      const receta = await Receta.create(recetaData);
      
      // Obtener la receta completa con las relaciones
      const recetaCompleta = await Receta.findByPk(receta.CodReceta, {
        include: [
          {
            model: Medico,
            as: 'medico'
          },
          {
            model: Medicamento,
            as: 'medicamento',
            include: [{
              model: TipoMedicamento,
              as: 'tipoMedicamento'
            }]
          }
        ]
      });
      
      res.status(201).json(recetaCompleta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar receta
  async update(req, res) {
    try {
      // Recalcular subtotal si se cambian cantidad o precio
      if (req.body.cantidad || req.body.precioUnitario) {
        const recetaActual = await Receta.findByPk(req.params.id);
        const cantidad = req.body.cantidad || recetaActual.cantidad;
        const precio = req.body.precioUnitario || recetaActual.precioUnitario;
        req.body.subtotal = cantidad * precio;
      }

      const [updated] = await Receta.update(req.body, {
        where: { CodReceta: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }

      const receta = await Receta.findByPk(req.params.id, {
        include: [
          {
            model: Medico,
            as: 'medico'
          },
          {
            model: Medicamento,
            as: 'medicamento',
            include: [{
              model: TipoMedicamento,
              as: 'tipoMedicamento'
            }]
          }
        ]
      });
      res.json(receta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar receta
  async delete(req, res) {
    try {
      const deleted = await Receta.destroy({
        where: { CodReceta: req.params.id }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }

      res.json({ message: 'Receta eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Cambiar estado de receta
  async cambiarEstado(req, res) {
    try {
      const { estado } = req.body;
      const estadosValidos = ['pendiente', 'entregado', 'cancelado'];
      
      if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: 'Estado no válido' });
      }

      const [updated] = await Receta.update({ estado }, {
        where: { CodReceta: req.params.id }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Receta no encontrada' });
      }

      const receta = await Receta.findByPk(req.params.id, {
        include: [
          {
            model: Medico,
            as: 'medico'
          },
          {
            model: Medicamento,
            as: 'medicamento'
          }
        ]
      });
      res.json(receta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = recetaController;