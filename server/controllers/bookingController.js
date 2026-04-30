const Booking = require('../models/Booking');
const Space   = require('../models/Space');

const timeToMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const hasOverlap = (existingStart, existingEnd, newStart, newEnd) =>
  newStart < existingEnd && newEnd > existingStart;

exports.checkAvailability = async (req, res, next) => {
  try {
    const { spaceId, date, startTime, endTime } = req.query;
    const bookings = await Booking.find({ space: spaceId, date, status: 'confirmed' });
    const newStart = timeToMinutes(startTime);
    const newEnd   = timeToMinutes(endTime);
    const available = !bookings.some(b =>
      hasOverlap(timeToMinutes(b.startTime), timeToMinutes(b.endTime), newStart, newEnd)
    );
    res.json({ available });
  } catch (err) { next(err); }
};

exports.createBooking = async (req, res, next) => {
  try {
    const { spaceId, date, startTime, endTime, notes } = req.body;
    const space = await Space.findById(spaceId);
    if (!space || !space.isActive) return res.status(404).json({ message: 'Espacio no encontrado' });

    // Validar horarios del espacio
    if (timeToMinutes(startTime) < timeToMinutes(space.openTime) ||
        timeToMinutes(endTime)   > timeToMinutes(space.closeTime)) {
      return res.status(400).json({ message: `Horario fuera de rango (${space.openTime}–${space.closeTime})` });
    }
    if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
      return res.status(400).json({ message: 'La hora de fin debe ser posterior a la de inicio' });
    }

    // Verificar solapamiento
    const conflicts = await Booking.find({ space: spaceId, date, status: 'confirmed' });
    const newStart = timeToMinutes(startTime);
    const newEnd   = timeToMinutes(endTime);
    const conflict = conflicts.some(b =>
      hasOverlap(timeToMinutes(b.startTime), timeToMinutes(b.endTime), newStart, newEnd)
    );
    if (conflict) return res.status(409).json({ message: 'El espacio ya está reservado en ese horario' });

    const hours = (timeToMinutes(endTime) - timeToMinutes(startTime)) / 60;
    const totalPrice = hours * space.pricePerHour;

    const booking = await Booking.create({
      user: req.user._id, space: spaceId, date, startTime, endTime, totalPrice, notes,
    });
    await booking.populate(['user', 'space']);
    res.status(201).json(booking);
  } catch (err) { next(err); }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('space', 'name type image pricePerHour')
      .sort('-createdAt');
    res.json(bookings);
  } catch (err) { next(err); }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: 'Reserva no encontrada' });
    if (booking.status === 'cancelled') return res.status(400).json({ message: 'Ya fue cancelada' });
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Reserva cancelada exitosamente', booking });
  } catch (err) { next(err); }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('space', 'name type')
      .sort('-createdAt');
    res.json(bookings);
  } catch (err) { next(err); }
};
