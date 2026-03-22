// js/services/StorageService.js

import { Reserva } from '../models/reserva.js';

const STORAGE_KEY = 'workhub_reservas';

export const StorageService = {

  /**
   * Lee las reservas de localStorage y las reconstruye como instancias de Reserva.
   * Si no hay datos o hay error de parseo, retorna array vacío.
   */
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

  /**
   * Guarda el array completo de reservas en localStorage.
   * Usa .map(r => r.toJSON()) para serializar cada instancia.
   */
  guardarReservas(reservas) {
    const datos = reservas.map(r => r.toJSON());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
  },

  /**
   * Agrega una reserva al array existente en localStorage.
   */
  agregarReserva(reserva) {
    const reservas = this.obtenerReservas();
    reservas.push(reserva);
    this.guardarReservas(reservas);
  },

  /**
   * Elimina una reserva por id usando .filter() y reguarda.
   */
  eliminarReserva(id) {
    const reservas = this.obtenerReservas().filter(r => r.id !== id);
    this.guardarReservas(reservas);
  },

  /**
   * Limpia todas las reservas de localStorage.
   */
  limpiar() {
    localStorage.removeItem(STORAGE_KEY);
  }
};