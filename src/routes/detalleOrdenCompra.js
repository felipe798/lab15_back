const express = require('express');
const router = express.Router();
const detalleOrdenCompraController = require('../controllers/detalleOrdenCompraController');

router.get('/', detalleOrdenCompraController.getAll);
router.get('/orden/:codOrdenCompra', detalleOrdenCompraController.getByOrdenCompra);
router.post('/', detalleOrdenCompraController.create);
router.put('/:codOrdenCompra/:codMedicamento', detalleOrdenCompraController.update);
router.delete('/:codOrdenCompra/:codMedicamento', detalleOrdenCompraController.delete);

module.exports = router;