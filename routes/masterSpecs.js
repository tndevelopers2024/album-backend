const express = require('express');
const router = express.Router();
const masterSpecController = require('../controllers/masterSpecController');

router.post('/', masterSpecController.createSpecification);
router.get('/', masterSpecController.getAllSpecifications);
router.get('/:id', masterSpecController.getSpecificationById);
router.put('/:id', masterSpecController.updateSpecification);
router.delete('/:id', masterSpecController.deleteSpecification);

module.exports = router;
