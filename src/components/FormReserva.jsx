import { useState } from 'react';
import { Reserva } from '../models/Reserva.js';
import { StorageService } from '../services/StorageService.js';
import { ValidadorService } from '../services/ValidadorService.js';

function FormReserva({ reservas, onReservaCreada, onMensaje }) {
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', correo: '',
    espacio: '', fecha: '', hora: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulario
    const vForm = ValidadorService.validarFormulario(formData);
    if (!vForm.valido) { onMensaje(vForm.errores[0], 'error'); return; }

    // Validar horario
    const vHora = ValidadorService.validarHorario(formData.fecha, formData.hora);
    if (!vHora.valido) { onMensaje(vHora.mensaje, 'error'); return; }

    // Validar disponibilidad
    const vDisp = ValidadorService.validarDisponibilidad(reservas, formData);
    if (!vDisp.valido) { onMensaje(vDisp.mensaje, 'error'); return; }

    // Crear y guardar
    const reserva = new Reserva(formData);
    StorageService.agregarReserva(reserva);
    onReservaCreada(reserva);
    onMensaje('Reserva creada exitosamente.', 'exito');

    // Resetear
    setFormData({ nombre: '', apellido: '', correo: '', espacio: '', fecha: '', hora: '' });
  };

  return (
    <section id="formulario" className="section">
      <div className="container">
        <h2 className="text-center mb-3">Reserva tu Espacio</h2>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre"
                      placeholder="Tu nombre" value={formData.nombre}
                      onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input type="text" className="form-control" name="apellido"
                      placeholder="Tu apellido" value={formData.apellido}
                      onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" name="correo"
                      placeholder="nombre@email.com" value={formData.correo}
                      onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Selecciona el espacio</label>
                    <select className="form-select" name="espacio"
                      value={formData.espacio} onChange={handleChange} required>
                      <option value="">-- Elige una opción --</option>
                      <option value="escritorio">Escritorio Individual</option>
                      <option value="reunion">Sala de Reuniones</option>
                      <option value="oficina">Oficina Privada</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Día</label>
                    <input type="date" className="form-control" name="fecha"
                      value={formData.fecha} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Hora</label>
                    <input type="time" className="form-control" name="hora"
                      min="08:00" max="18:00"
                      value={formData.hora} onChange={handleChange} required />
                  </div>

                  <p className="text-muted small">
                    Horarios:<br />
                    Lunes a Viernes: 08:00 - 18:00<br />
                    Sábado: 08:00 - 14:00
                  </p>

                  <button type="submit" className="btn btn-primary w-100">Reservar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormReserva;
