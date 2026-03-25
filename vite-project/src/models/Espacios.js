//models/Espacios.js

export class Espacios {

<<<<<<< Updated upstream
  constructor({ id, nombre, capacidad, precio, equipamiento, img }) {
=======
  constructor({ id, nombre, capacidad, precio, equipamiento }) {
>>>>>>> Stashed changes
    this.id            = id;
    this.nombre        = nombre;
    this.capacidad     = capacidad;
    this.precio        = precio;
    this.equipamiento  = equipamiento;
<<<<<<< Updated upstream
    this.img           = img;
  }

=======
  }
git 
>>>>>>> Stashed changes
  /**
   * Retorna el catálogo completo de espacios del coworking.
   * Los datos coinciden con los del HTML actual.
   */
  static obtenerCatalogo() {
    return [
      new Espacios({
        id: 'escritorio',
        nombre: 'Escritorio Individual',
        capacidad: 1,
        precio: 5000,
<<<<<<< Updated upstream
        equipamiento: ['Escritorio', 'Silla ergonómica', 'WiFi'],
        img: '/Images/oficina1.jpg'
=======
        equipamiento: ['Escritorio', 'Silla ergonómica', 'WiFi']
>>>>>>> Stashed changes
      }),
      new Espacios({
        id: 'reunion',
        nombre: 'Sala de Reuniones',
        capacidad: 8,
        precio: 10000,
<<<<<<< Updated upstream
        equipamiento: ['Pantalla', 'Pizarra', 'WiFi'],
        img: '/Images/oficina3.jpg'
=======
        equipamiento: ['Pantalla', 'Pizarra', 'WiFi']
>>>>>>> Stashed changes
      }),
      new Espacios({
        id: 'oficina',
        nombre: 'Oficina Privada',
        capacidad: 4,
        precio: 20000,
<<<<<<< Updated upstream
        equipamiento: ['Escritorios', 'Pantalla', 'Aire acondicionado', 'WiFi'],
        img: '/Images/oficina5.jpg'
=======
        equipamiento: ['Escritorios', 'Pantalla', 'Aire acondicionado', 'WiFi']
>>>>>>> Stashed changes
      }),
    ];
  }

<<<<<<< Updated upstream
  /** Busca un espacio por su id usando Array.find() */
  static buscarPorId(id) {
    return this.obtenerCatalogo().find(espacio => espacio.id === id);
=======
  /** Busca un espacios por su id usando Array.find() */
  static buscarPorId(id) {
    return this.obtenerCatalogo().find(Espacios => Espacios.id === id);
>>>>>>> Stashed changes
  }

  /** Filtra espacios con capacidad >= min usando Array.filter() */
  static filtrarPorCapacidad(min) {
<<<<<<< Updated upstream
    return this.obtenerCatalogo().filter(espacio => espacio.capacidad >= min);
=======
    return this.obtenerCatalogo().filter(Espacios => Espacios.capacidad >= min);
>>>>>>> Stashed changes
  }

  /** Getter — Descripción del equipamiento usando Array.map() */
  get descripcion() {
    return this.equipamiento.map(item => item).join(', ');
  }

<<<<<<< Updated upstream
  /** Retorna la capacidad formateada con texto */
  get capacidadTexto() {
    return `${this.capacidad} persona${this.capacidad > 1 ? 's' : ''}`;
  }

  /** Retorna el precio formateado en CLP con texto de hora */
  get precioFormateado() {
    return `$${this.precio.toLocaleString('es-CL')} / hora`;
=======
  /** Retorna el precio formateado en CLP */
  get precioFormateado() {
    return `$${this.precio.toLocaleString('es-CL')}`;
>>>>>>> Stashed changes
  }
}