// js/services/ValidadorService.js

export const ValidadorService = {

  /**
   * Verifica si ya existe una reserva en el mismo espacio, fecha y hora.
   * Usa Array.find() para detectar conflictos.
   * @returns {{ valido: boolean, mensaje: string }}
   */
  validarDisponibilidad(reservas, nuevaReserva) {
    const conflicto = reservas.find(r =>
      r.espacio === nuevaReserva.espacio &&
      r.fecha   === nuevaReserva.fecha &&
      r.hora    === nuevaReserva.hora
    );

    if (conflicto) {
      return { valido: false, mensaje: 'Ese espacio ya está reservado en esa fecha y hora.' };
    }
    return { valido: true, mensaje: '' };
  },

  /**
   * Valida que la fecha y hora estén dentro del horario permitido:
   * - Lunes a Viernes: 08:00 - 18:00
   * - Sábado: 08:00 - 14:00
   * - Domingo: cerrado
   * Usa el objeto Date para obtener el día de la semana.
   * @returns {{ valido: boolean, mensaje: string }}
   */
  validarHorario(fecha, hora) {
    // Se agrega T00:00:00 para evitar desfase de zona horaria
    const dia = new Date(fecha + 'T00:00:00').getDay();
    const [horas, minutos] = hora.split(':').map(Number);
    const horaNum = horas + minutos / 60;

    // Domingo (0) → cerrado
    if (dia === 0) {
      return { valido: false, mensaje: 'No se puede reservar los domingos.' };
    }

    // Sábado (6) → 08:00 a 14:00
    if (dia === 6) {
      if (horaNum < 8 || horaNum >= 14) {
        return { valido: false, mensaje: 'Sábados: horario de 08:00 a 14:00.' };
      }
      return { valido: true, mensaje: '' };
    }

    // Lunes a Viernes (1-5) → 08:00 a 18:00
    if (horaNum < 8 || horaNum >= 18) {
      return { valido: false, mensaje: 'Lunes a Viernes: horario de 08:00 a 18:00.' };
    }
    return { valido: true, mensaje: '' };
  },

  /**
   * Valida los campos del formulario.
   * Usa destructuring para extraer los valores.
   * Usa regex para validar formato de correo.
   * @returns {{ valido: boolean, errores: string[] }}
   */
  validarFormulario({ nombre, apellido, correo, espacio, fecha, hora }) {
    const errores = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || nombre.trim() === '')   errores.push('El nombre es obligatorio.');
    if (!apellido || apellido.trim() === '') errores.push('El apellido es obligatorio.');
    if (!correo || !emailRegex.test(correo))  errores.push('Ingresa un correo válido.');
    if (!espacio)                              errores.push('Selecciona un espacio.');
    if (!fecha)                                errores.push('Selecciona una fecha.');
    if (!hora)                                 errores.push('Selecciona una hora.');

    return {
      valido: errores.length === 0,
      errores
    };
  }
};