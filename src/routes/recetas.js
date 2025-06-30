const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController');

router.get('/', recetaController.getAll);
router.get('/:id', recetaController.getById);
router.get('/medico/:codMedico', recetaController.getByMedico);
router.post('/', recetaController.create);
router.put('/:id', recetaController.update);
router.put('/:id/estado', recetaController.cambiarEstado);
router.delete('/:id', recetaController.delete);

module.exports = router;