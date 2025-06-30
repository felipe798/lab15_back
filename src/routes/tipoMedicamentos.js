const express = require('express');
const router = express.Router();
const tipoMedicamentoController = require('../controllers/tipoMedicamentoController');

router.get('/', tipoMedicamentoController.getAll);
router.get('/:id', tipoMedicamentoController.getById);
router.post('/', tipoMedicamentoController.create);
router.put('/:id', tipoMedicamentoController.update);
router.delete('/:id', tipoMedicamentoController.delete);

module.exports = router;