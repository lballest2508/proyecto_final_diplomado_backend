const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories.map((cat) => cat.name));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

module.exports = router;