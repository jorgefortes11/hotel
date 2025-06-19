const express = require('express');
const router = express.Router();
const { Room } = require('../models');

router.get('/', async (req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
});

router.post('/', async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    console.error("❌ Erro ao criar quarto:", err);
    res.status(400).json({ erro: err.message });
  }
});

module.exports = router;
