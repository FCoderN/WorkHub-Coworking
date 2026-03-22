// js/main.js

import { controladorUI } from './ui/controladorUI.js';

/**
 * Punto de entrada de la aplicación.
 * Espera a que el DOM esté completamente cargado antes de inicializar.
 */
document.addEventListener('DOMContentLoaded', () => {
  const ui = new controladorUI();
  console.log('WorkHub Módulo 2 inicializado correctamente.');
});