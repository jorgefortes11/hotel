const Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true });
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createRoom = async (req, res) => {
  const { roomNumber, type, price, capacity, description, amenities } = req.body;

  try {
    const room = new Room({
      roomNumber,
      type,
      price,
      capacity,
      description,
      amenities
    });

    await room.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateRoom = async (req, res) => {
  const { roomNumber, type, price, capacity, description, amenities, isAvailable } = req.body;

  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    room.roomNumber = roomNumber || room.roomNumber;
    room.type = type || room.type;
    room.price = price || room.price;
    room.capacity = capacity || room.capacity;
    room.description = description || room.description;
    room.amenities = amenities || room.amenities;
    room.isAvailable = isAvailable !== undefined ? isAvailable : room.isAvailable;

    await room.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    await room.remove();
    res.json({ msg: 'Room removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};