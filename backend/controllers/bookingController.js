const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { validationResult } = require('express-validator');

exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { room, checkInDate, checkOutDate, specialRequests } = req.body;
  
  try {
    // Verificar se o quarto existe e está disponível
    const roomToBook = await Room.findById(room);
    if (!roomToBook) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    if (!roomToBook.isAvailable) {
      return res.status(400).json({ msg: 'Room is not available' });
    }

    // Calcular preço total (simplificado)
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * roomToBook.price;

    // Criar a reserva
    const booking = new Booking({
      user: req.user.id,
      room,
      checkInDate,
      checkOutDate,
      totalPrice,
      specialRequests,
      status: 'confirmed'
    });

    await booking.save();

    // Atualizar disponibilidade do quarto (opcional)
    // roomToBook.isAvailable = false;
    // await roomToBook.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('room');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    
    // Verificar se o usuário é o dono da reserva ou admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Verificar se a reserva já não foi cancelada
    if (booking.status === 'cancelled') {
      return res.status(400).json({ msg: 'Booking already cancelled' });
    }

    // Verificar se não é muito próximo da data de check-in
    const today = new Date();
    const checkIn = new Date(booking.checkInDate);
    const daysBeforeCheckIn = Math.ceil((checkIn - today) / (1000 * 60 * 60 * 24));
    
    if (daysBeforeCheckIn < 2) {
      return res.status(400).json({ msg: 'Cannot cancel within 48 hours of check-in' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Liberar o quarto novamente
    await Room.findByIdAndUpdate(booking.room, { isAvailable: true });

    res.json({ msg: 'Booking cancelled successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};