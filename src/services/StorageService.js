import { Reserva } from '../models/Reserva.js';

const STORAGE_KEY = 'workhub_reservas';

export const StorageService = {
  obtenerReservas() {
    try {
      const datos = localStorage.getItem(STORAGE_KEY);
      if (!datos) return [];
      const parsed = JSON.parse(datos);
      return parsed.map(item => Reserva.fromJSON(item));
    } catch (error) {
      console.error('Error al leer reservas:', error);
      return [];
    }
  },

  guardarReservas(reservas) {
    const datos = reservas.map(r => r.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
  },

  agregarReserva(reserva) {
    const reservas = this.obtenerReservas();
    reservas.push(reserva);
    this.guardarReservas(reservas);
  },

  eliminarReserva(id) {
    const reservas = this.obtenerReservas().filter(r => r.id !== id);
    this.guardarReservas(reservas);
  },

  limpiar() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
