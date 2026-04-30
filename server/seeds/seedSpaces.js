require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const Space    = require('../models/Space');

const spaces = [
  {
    name: 'Escritorio Individual',
    type: 'escritorio',
    description: 'Espacio personal con silla ergonómica, ideal para freelancers y trabajo remoto. Ambiente tranquilo y productivo.',
    capacity: 1,
    pricePerHour: 5000,
    equipment: ['Escritorio amplio', 'Silla ergonómica', 'WiFi de alta velocidad', 'Toma corriente individual'],
    image: '/recursos/oficina1.jpg',
    openTime: '08:00',
    closeTime: '18:00',
  },
  {
    name: 'Sala de Reuniones',
    type: 'reunion',
    description: 'Sala equipada para reuniones de equipo y presentaciones profesionales. Capacidad para hasta 8 personas.',
    capacity: 8,
    pricePerHour: 10000,
    equipment: ['Pantalla 65"', 'Pizarra blanca', 'WiFi dedicado', 'Video conferencia', 'Climatización'],
    image: '/recursos/oficina3.jpg',
    openTime: '08:00',
    closeTime: '18:00',
  },
  {
    name: 'Oficina Privada',
    type: 'oficina',
    description: 'Oficina privada totalmente equipada para equipos pequeños. Acceso exclusivo y ambiente profesional.',
    capacity: 4,
    pricePerHour: 20000,
    equipment: ['4 Escritorios', 'Pantalla de trabajo', 'Aire acondicionado', 'WiFi exclusivo', 'Impresora'],
    image: '/recursos/oficina5.jpg',
    openTime: '08:00',
    closeTime: '18:00',
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Space.deleteMany({});
    await Space.insertMany(spaces);
    console.log('✅ Espacios creados exitosamente');
  } catch (err) {
    console.error('❌ Error en seed:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();
