const Space = require('../models/Space');

exports.getAll = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.type)                filter.type     = req.query.type;
    if (req.query.capacity)            filter.capacity  = { $gte: Number(req.query.capacity) };
    if (req.query.maxPrice)            filter.pricePerHour = { $lte: Number(req.query.maxPrice) };

    const spaces = await Space.find(filter).sort('pricePerHour');
    res.json(spaces);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space || !space.isActive) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json(space);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const space = await Space.create(req.body);
    res.status(201).json(space);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const space = await Space.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!space) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json(space);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await Space.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Espacio desactivado' });
  } catch (err) { next(err); }
};
