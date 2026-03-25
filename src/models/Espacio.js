export class Espacio {
  constructor({ id, nombre, capacidad, precio, equipamiento }) {
    this.id           = id;
    this.nombre       = nombre;
    this.capacidad    = capacidad;
    this.precio       = precio;
    this.equipamiento = equipamiento;
  }

  static obtenerCatalogo() {
    return [
      new Espacio({
        id: 'escritorio', nombre: 'Escritorio Individual',
        capacidad: 1, precio: 5000,
        equipamiento: ['Escritorio', 'Silla ergonómica', 'WiFi']
      }),
      new Espacio({
        id: 'reunion', nombre: 'Sala de Reuniones',
        capacidad: 8, precio: 10000,
        equipamiento: ['Pantalla', 'Pizarra', 'WiFi']
      }),
      new Espacio({
        id: 'oficina', nombre: 'Oficina Privada',
        capacidad: 4, precio: 20000,
        equipamiento: ['Escritorios', 'Pantalla', 'Aire acondicionado', 'WiFi']
      }),
    ];
  }

  static buscarPorId(id) {
    return this.obtenerCatalogo().find(e => e.id === id);
  }

  static filtrarPorCapacidad(min) {
    return this.obtenerCatalogo().filter(e => e.capacidad >= min);
  }

  get descripcion() {
    return this.equipamiento.map(item => item).join(', ');
  }

  get precioFormateado() {
    return `$${this.precio.toLocaleString('es-CL')}`;
  }
}
