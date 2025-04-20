const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Obtener todos los pedidos (para admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

// Crear un pedido
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear pedido' });
  }
});

module.exports = router;