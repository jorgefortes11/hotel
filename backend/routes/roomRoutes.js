const express = require('express');
const router = express.Router();
const { Room } = require('../models');

// Obter todos os quartos
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    console.error("Erro ao buscar quartos:", err);
    res.status(500).json({ erro: err.message });
  }
});

// Criar novo quarto
router.post('/', async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    console.error("❌ Erro ao criar quarto:", err);
    res.status(400).json({ erro: err.message });
  }
});

// Atualizar quarto por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Room.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedRoom = await Room.findByPk(id);
      res.json(updatedRoom);
    } else {
      res.status(404).json({ erro: "Quarto não encontrado" });
    }
  } catch (err) {
    console.error("❌ Erro ao atualizar quarto:", err);
    res.status(500).json({ erro: err.message });
  }
});

// Apagar quarto por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Room.destroy({ where: { id } });
    if (deleted) {
      res.json({ mensagem: "Quarto eliminado com sucesso" });
    } else {
      res.status(404).json({ erro: "Quarto não encontrado" });
    }
  } catch (err) {
    console.error("❌ Erro ao apagar quarto:", err);
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
