// js/models/Espacio.js

export class Espacio {

  constructor({ id, nombre, capacidad, precio, equipamiento }) {
    this.id            = id;
    this.nombre        = nombre;
    this.capacidad     = capacidad;
    this.precio        = precio;
    this.equipamiento  = equipamiento;
  }

  /**
   * Retorna el catálogo completo de espacios del coworking.
   * Los datos coinciden con los del HTML actual.
   */
  static obtenerCatalogo() {
    return [
      new Espacio({
        id: 'escritorio',
        nombre: 'Escritorio Individual',
        capacidad: 1,
        precio: 5000,
        equipamiento: ['Escritorio', 'Silla ergonómica', 'WiFi']
      }),
      new Espacio({
        id: 'reunion',
        nombre: 'Sala de Reuniones',
        capacidad: 8,
        precio: 10000,
        equipamiento: ['Pantalla', 'Pizarra', 'WiFi']
      }),
      new Espacio({
        id: 'oficina',
        nombre: 'Oficina Privada',
        capacidad: 4,
        precio: 20000,
        equipamiento: ['Escritorios', 'Pantalla', 'Aire acondicionado', 'WiFi']
      }),
    ];
  }

  /** Busca un espacio por su id usando Array.find() */
  static buscarPorId(id) {
    return this.obtenerCatalogo().find(espacio => espacio.id === id);
  }

  /** Filtra espacios con capacidad >= min usando Array.filter() */
  static filtrarPorCapacidad(min) {
    return this.obtenerCatalogo().filter(espacio => espacio.capacidad >= min);
  }

  /** Getter — Descripción del equipamiento usando Array.map() */
  get descripcion() {
    return this.equipamiento.map(item => item).join(', ');
  }

  /** Retorna el precio formateado en CLP */
  get precioFormateado() {
    return `$${this.precio.toLocaleString('es-CL')}`;
  }
}