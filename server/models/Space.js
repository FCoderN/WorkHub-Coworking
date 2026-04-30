const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  type:        { type: String, enum: ['escritorio', 'reunion', 'oficina'], required: true },
  description: { type: String, required: true },
  capacity:    { type: Number, required: true, min: 1 },
  pricePerHour:{ type: Number, required: true, min: 0 },
  equipment:   [{ type: String }],
  image:       { type: String, default: '' },
  openTime:    { type: String, default: '08:00' },
  closeTime:   { type: String, default: '18:00' },
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Space', spaceSchema);
