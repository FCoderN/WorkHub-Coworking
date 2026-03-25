export const ValidadorService = {
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

  validarHorario(fecha, hora) {
    const dia = new Date(fecha + 'T00:00:00').getDay();
    const [horas, minutos] = hora.split(':').map(Number);
    const horaNum = horas + minutos / 60;

    if (dia === 0) {
      return { valido: false, mensaje: 'No se puede reservar los domingos.' };
    }
    if (dia === 6) {
      if (horaNum < 8 || horaNum >= 14) {
        return { valido: false, mensaje: 'Sábados: horario disponible de 08:00 a 14:00.' };
      }
      return { valido: true, mensaje: '' };
    }
    if (horaNum < 8 || horaNum >= 18) {
      return { valido: false, mensaje: 'Lunes a Viernes: horario disponible de 08:00 a 18:00.' };
    }
    return { valido: true, mensaje: '' };
  },

  validarFormulario({ nombre, apellido, correo, espacio, fecha, hora }) {
    const errores = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre || nombre.trim() === '')   errores.push('El nombre es obligatorio.');
    if (!apellido || apellido.trim() === '') errores.push('El apellido es obligatorio.');
    if (!correo || !emailRegex.test(correo))  errores.push('Ingresa un correo electrónico válido.');
    if (!espacio)                              errores.push('Selecciona un espacio.');
    if (!fecha)                                errores.push('Selecciona una fecha.');
    if (!hora)                                 errores.push('Selecciona una hora.');

    return { valido: errores.length === 0, errores };
  }
};
