// js/models/Reserva.js

export class Reserva {

  constructor({ id, nombre, apellido, correo, espacio, fecha, hora }) {
    this.id       = id || Date.now();
    this.nombre   = nombre;
    this.apellido = apellido;
    this.correo   = correo;
    this.espacio  = espacio;
    this.fecha    = fecha;
    this.hora     = hora;
  }

  /**
   * Getter — Retorna un resumen legible de la reserva
   * Ejemplo: "Juan Pérez — Sala de Reuniones — 2026-03-20 10:00"
   */
  get resumen() {
    return `${this.nombre} ${this.apellido} — ${this.espacio} — ${this.fecha} ${this.hora}`;
  }

  /**
   * Serializa la instancia a un objeto plano (para JSON.stringify)
   */
  toJSON() {
    const { id, nombre, apellido, correo, espacio, fecha, hora } = this;
    return { id, nombre, apellido, correo, espacio, fecha, hora };
  }

  /**
   * Reconstruye una instancia de Reserva desde un objeto plano
   * (para recuperar desde localStorage)
   */
  static fromJSON(data) {
    return new Reserva(data);
  }
}