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

  get resumen() {
    return `${this.nombre} ${this.apellido} — ${this.espacio} — ${this.fecha} ${this.hora}`;
  }

  toJSON() {
    const { id, nombre, apellido, correo, espacio, fecha, hora } = this;
    return { id, nombre, apellido, correo, espacio, fecha, hora };
  }

  static fromJSON(data) {
    return new Reserva(data);
  }
}
