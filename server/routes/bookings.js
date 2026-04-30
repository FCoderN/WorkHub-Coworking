const express  = require('express');
const { body } = require('express-validator');
const router   = express.Router();
const ctrl     = require('../controllers/bookingController');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/availability', ctrl.checkAvailability);

router.post('/',
  protect,
  body('spaceId').notEmpty().withMessage('Espacio requerido'),
  body('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Fecha inválida (YYYY-MM-DD)'),
  body('startTime').matches(/^\d{2}:\d{2}$/).withMessage('Hora inicio inválida (HH:MM)'),
  body('endTime').matches(/^\d{2}:\d{2}$/).withMessage('Hora fin inválida (HH:MM)'),
  validate,
  ctrl.createBooking
);

router.get('/mine',     protect, ctrl.getMyBookings);
router.patch('/:id/cancel', protect, ctrl.cancelBooking);
router.get('/',        protect, adminOnly, ctrl.getAllBookings);

module.exports = router;
