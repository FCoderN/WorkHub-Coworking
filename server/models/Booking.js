const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  space:     { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
  date:      { type: String, required: true },   // 'YYYY-MM-DD'
  startTime: { type: String, required: true },   // 'HH:MM'
  endTime:   { type: String, required: true },   // 'HH:MM'
  status:    { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  totalPrice:{ type: Number, required: true },
  notes:     { type: String, default: '' },
}, { timestamps: true });

// Índice para consultas de disponibilidad rápidas
bookingSchema.index({ space: 1, date: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
