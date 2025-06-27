const DetalleOrdenCompra = require('../models/DetalleOrdenCompra');

const detalleOrdenCompraController = {
  // Obtener todos
  async getAll(req, res) {
    try {
      const detalles = await DetalleOrdenCompra.findAll({
        order: [['CodOrdenCompra', 'ASC'], ['CodMedicamento', 'ASC']]
      });
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener por orden de compra
  async getByOrdenCompra(req, res) {
    try {
      const detalles = await DetalleOrdenCompra.findAll({
        where: { CodOrdenCompra: req.params.codOrdenCompra }
      });
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Crear
  async create(req, res) {
    try {
      const detalle = await DetalleOrdenCompra.create(req.body);
      res.status(201).json(detalle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar
  async update(req, res) {
    try {
      const { codOrdenCompra, codMedicamento } = req.params;
      
      const [updated] = await DetalleOrdenCompra.update(req.body, {
        where: { 
          CodOrdenCompra: codOrdenCompra,
          CodMedicamento: codMedicamento 
        }
      });

      if (!updated) {
        return res.status(404).json({ error: 'Detalle no encontrado' });
      }

      const detalle = await DetalleOrdenCompra.findOne({
        where: { 
          CodOrdenCompra: codOrdenCompra,
          CodMedicamento: codMedicamento 
        }
      });
      
      res.json(detalle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar
  async delete(req, res) {
    try {
      const { codOrdenCompra, codMedicamento } = req.params;
      
      const deleted = await DetalleOrdenCompra.destroy({
        where: { 
          CodOrdenCompra: codOrdenCompra,
          CodMedicamento: codMedicamento 
        }
      });

      if (!deleted) {
        return res.status(404).json({ error: 'Detalle no encontrado' });
      }

      res.json({ message: 'Detalle eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = detalleOrdenCompraController;