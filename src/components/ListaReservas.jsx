import { Espacio } from '../models/Espacio.js';
import { StorageService } from '../services/StorageService.js';

function ListaReservas({ reservas, onEliminar }) {
  const handleEliminar = (id) => {
    StorageService.eliminarReserva(id);
    onEliminar(id);
  };

  if (reservas.length === 0) {
    return (
      <section className="section">
        <div className="container">
          <p className="reservas-vacio">No hay reservas activas. ¡Crea la primera!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">

            <h3 className="reservas-titulo">
              Reservas Activas
              <span className="badge-count">{reservas.length}</span>
            </h3>

            {reservas.map(reserva => {
              const espacio = Espacio.buscarPorId(reserva.espacio);
              const nombreEsp = espacio ? espacio.nombre : reserva.espacio;
              const precio = espacio ? espacio.precioFormateado : '';

              return (
                <div className="reserva-card" key={reserva.id}>
                  <div>
                    <p className="reserva-nombre">{reserva.nombre} {reserva.apellido}</p>
                    <p className="reserva-detalle">{nombreEsp} — {reserva.fecha} — {reserva.hora}</p>
                    <p className="reserva-precio">{precio} /hora</p>
                  </div>
                  <button className="btn-eliminar" onClick={() => handleEliminar(reserva.id)}>
                    Eliminar
                  </button>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}

export default ListaReservas;
