// js/App.js

import { Reserva }          from './models/reserva.js';
import { Espacio }          from './models/espacio.js';
import { StorageService }   from './services/almacenadorServicios.js';
import { ValidadorService } from './services/validadorServicios.js';

export class App {

  constructor() {
    // Carga reservas desde localStorage al iniciar
    this.reservas = StorageService.obtenerReservas();
    // Carga el catálogo de espacios
    this.espacios = Espacio.obtenerCatalogo();
  }

  /**
   * Flujo completo para agregar una reserva:
   * 1. Validar formulario (campos vacíos, correo)
   * 2. Validar horario (día y hora permitidos)
   * 3. Validar disponibilidad (no duplicados)
   * 4. Crear instancia de Reserva y guardar
   * @returns {{ exito: boolean, mensaje: string }}
   */
  agregarReserva(datos) {
    // Paso 1 — Validar formulario
    const vForm = ValidadorService.validarFormulario(datos);
    if (!vForm.valido) {
      return { exito: false, mensaje: vForm.errores[0] };
    }

    // Paso 2 — Validar horario
    const vHorario = ValidadorService.validarHorario(datos.fecha, datos.hora);
    if (!vHorario.valido) {
      return { exito: false, mensaje: vHorario.mensaje };
    }

    // Paso 3 — Validar disponibilidad
    const vDisp = ValidadorService.validarDisponibilidad(this.reservas, datos);
    if (!vDisp.valido) {
      return { exito: false, mensaje: vDisp.mensaje };
    }

    // Paso 4 — Crear y guardar
    const reserva = new Reserva(datos);
    StorageService.agregarReserva(reserva);
    this.reservas.push(reserva);

    return { exito: true, mensaje: 'Reserva creada exitosamente.' };
  }

  /**
   * Elimina una reserva por id.
   * Actualiza tanto localStorage como el array en memoria.
   */
  eliminarReserva(id) {
    StorageService.eliminarReserva(id);
    this.reservas = this.reservas.filter(r => r.id !== id);
  }

  /** Retorna todas las reservas actuales */
  obtenerReservas() {
    return this.reservas;
  }

  /** Filtra reservas por tipo de espacio usando .filter() */
  obtenerReservasPorEspacio(espacioId) {
    return this.reservas.filter(r => r.espacio === espacioId);
  }

  /** Busca una reserva por id usando .find() */
  buscarReservaPorId(id) {
    return this.reservas.find(r => r.id === id);
  }
}