const { listarOrdenesController } = require('../controllers/ordenes.controller');
const express = require('express');
const { Router } = express;
const router = Router();

router.get("/", listarOrdenesController);
router.get("/:id", listarOrdenesController);

module.exports = router;