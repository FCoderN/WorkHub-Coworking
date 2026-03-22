// js/ui/UIController.js

import { App }     from '../app.js';
import { Espacio } from '../models/espacio.js';

export class controladorUI {

  constructor() {
    this.app            = new App();
    this.formulario     = document.getElementById('formReserva');
    this.listaReservas  = document.getElementById('lista-reservas');
    this.toast          = document.getElementById('toast');
    this.init();
  }

  /**
   * Inicializa eventos y renderiza las reservas existentes en localStorage.
   */
  init() {
    this.formulario.addEventListener('submit', (e) => this.manejarSubmit(e));
    this.renderizarReservas();
  }

  /**
   * Maneja el evento submit del formulario.
   * Recopila los 6 campos, llama a App.agregarReserva(), muestra resultado.
   */
  manejarSubmit(event) {
    event.preventDefault();

    // Recopilar datos del formulario
    const datos = {
      nombre:   this.formulario.nombre.value.trim(),
      apellido: this.formulario.apellido.value.trim(),
      correo:   this.formulario.correo.value.trim(),
      espacio:  this.formulario.sala.value,
      fecha:    this.formulario.fecha.value,
      hora:     this.formulario.hora.value,
    };

    // Intentar agregar la reserva
    const resultado = this.app.agregarReserva(datos);

    if (resultado.exito) {
      this.mostrarMensaje(`✅ ${resultado.mensaje}`, 'exito');
      this.formulario.reset();
      this.renderizarReservas();
    } else {
      this.mostrarMensaje(`⚠️ ${resultado.mensaje}`, 'error');
    }
  }

  /**
   * Renderiza la lista de reservas en el contenedor #lista-reservas.
   * Usa .map() para generar HTML dinámico con template literals.
   * Cada tarjeta muestra nombre, espacio, fecha, precio y botón eliminar.
   */
  renderizarReservas() {
    const reservas = this.app.obtenerReservas();

    if (reservas.length === 0) {
      this.listaReservas.innerHTML = `
        <p class="reservas-vacio">No hay reservas activas. ¡Crea la primera!</p>
      `;
      return;
    }

    // Generar las tarjetas con .map()
    const tarjetas = reservas.map(reserva => {
      // Buscar el espacio para obtener nombre y precio
      const espacio = Espacio.buscarPorId(reserva.espacio);
      const nombreEspacio = espacio ? espacio.nombre : reserva.espacio;
      const precio = espacio ? espacio.precioFormateado : '';

      return `
        <div class="reserva-card">
          <div>
            <p class="reserva-nombre">${reserva.nombre} ${reserva.apellido}</p>
            <p class="reserva-detalle">${nombreEspacio} — ${reserva.fecha} — ${reserva.hora}</p>
            <p class="reserva-precio">${precio} /hora</p>
          </div>
          <button class="btn-eliminar" data-id="${reserva.id}">Eliminar</button>
        </div>
      `;
    }).join('');

    // Insertar título + tarjetas
    this.listaReservas.innerHTML = `
      <h3 class="reservas-titulo">
        Reservas Activas
        <span class="badge-count">${reservas.length}</span>
      </h3>
      ${tarjetas}
    `;

    // Agregar event listeners a los botones de eliminar
    this.listaReservas.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(e.target.dataset.id);
        this.eliminarReservaUI(id);
      });
    });
  }

  /**
   * Muestra un toast de notificación (reemplaza el alert()).
   * Usa la clase .wh-toast del CSS existente del proyecto.
   * @param {string} mensaje — Texto a mostrar
   * @param {string} tipo   — 'exito' o 'error'
   */
  mostrarMensaje(mensaje, tipo) {
    this.toast.textContent = mensaje;
    this.toast.style.borderLeftColor = tipo === 'exito' ? '#B5883E' : '#dc3545';
    this.toast.classList.add('show');

    setTimeout(() => {
      this.toast.classList.remove('show');
    }, 3000);
  }

  /**
   * Elimina una reserva y re-renderiza la lista.
   */
  eliminarReservaUI(id) {
    this.app.eliminarReserva(id);
    this.mostrarMensaje('🗑️ Reserva eliminada.', 'exito');
    this.renderizarReservas();
  }
}