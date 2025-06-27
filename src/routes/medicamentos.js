const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

router.get('/', medicamentoController.getAll);
router.get('/:id', medicamentoController.getById);
router.post('/', medicamentoController.create);
router.put('/:id', medicamentoController.update);
router.delete('/:id', medicamentoController.delete);

module.exports = router;