export class Reserva {

    constructor({ id, nombre, apellido, correo, sala, fecha, hora }) {
    this.id       = id || Date.now();
    this.nombre   = nombre;
    this.apellido = apellido;
    this.correo   = correo;
    this.sala     = sala;
    this.fecha    = fecha;
    this.hora     = hora;
    }

    /**
   * Getter 
   */
    get resumen() {

    const nombres = {
        escritorio: "Escritorio Individual",
        reunion: "Sala de Reuniones",
        oficina: "Oficina Privada"
    };

    const salaTexto = nombres[this.sala] || this.sala;

    return `${this.nombre} ${this.apellido} — ${salaTexto} — ${this.fecha} ${this.hora}`;
    }

    /**
   * Convierte la instancia a objeto plano para guardar en localStorage
   */
    toJSON() {
    const { id, nombre, apellido, correo, sala, fecha, hora } = this;
    return { id, nombre, apellido, correo, sala, fecha, hora };
    }

    /**
   * Reconstruye una Reserva desde JSON
   */
    static fromJSON(data) {
    return new Reserva(data);
    }
}