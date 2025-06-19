const express = require('express');
const router = express.Router();
const { Booking, User, Room } = require('../models');

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Room, attributes: ['id', 'roomNumber', 'type'] }
      ]
    });
    res.json(bookings);
  } catch (err) {
    console.error("❌ Erro ao buscar reservas:", err);
    res.status(500).json({ erro: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    console.error("❌ Erro ao criar reserva:", err);
    res.status(400).json({ erro: err.message });
  }
});

module.exports = router;
