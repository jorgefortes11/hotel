const express = require('express');
const router = express.Router();
const { Booking, Room, User } = require('../models');
const authMiddleware = require('../middlewares/authMiddleware');

// Criar nova reserva
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { RoomId, checkInDate, checkOutDate, specialRequests } = req.body;

    // Verifica se o quarto existe e está disponível
    const room = await Room.findByPk(RoomId);
    if (!room || !room.isAvailable) {
      return res.status(400).json({ erro: 'Quarto inválido ou indisponível.' });
    }

    // Calcula número de noites
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));

    // Calcula preço total
    const pricePerNight = parseFloat(room.price);
    if (isNaN(pricePerNight) || pricePerNight <= 0 || nights <= 0) {
      return res.status(400).json({ erro: 'Erro ao calcular o preço da reserva.' });
    }

    const totalPrice = pricePerNight * nights;

    // Cria a reserva
    const booking = await Booking.create({
      RoomId,
      UserId: req.user.id,
      checkInDate,
      checkOutDate,
      specialRequests,
      totalPrice,
      status: 'confirmed'
    });

    // Atualiza disponibilidade do quarto
    await room.update({ isAvailable: false });

    res.status(201).json(booking);
  } catch (err) {
    console.error("❌ Erro ao criar reserva:", err);
    res.status(400).json({ erro: err.message });
  }
});

// Obter todas as reservas (Admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Room, attributes: ['roomNumber'] }
      ]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar reservas' });
  }
});

// Obter reservas do utilizador autenticado (Cliente)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { UserId: req.user.id },
      include: [{ model: Room, attributes: ['roomNumber'] }]
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar suas reservas' });
  }
});

// Eliminar reserva
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ erro: 'Reserva não encontrada' });

    // Opcional: apenas o utilizador ou admin pode apagar
    if (booking.UserId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ erro: 'Sem permissão para apagar esta reserva' });
    }

    await booking.destroy();
    res.json({ mensagem: 'Reserva eliminada com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao eliminar reserva' });
  }
});

module.exports = router;
