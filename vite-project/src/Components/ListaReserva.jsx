
function ListaReserva({ reservas = [], eliminarReserva }) {
    return (
      <section id="seccion-reservas" className="container my-5">
  
        <h2 className="text-center mb-4">
          Reservas Realizadas
        </h2>
  
        {reservas?.length === 0 ? (
          <p className="text-center text-muted">
            No hay reservas registradas aún.
          </p>
        ) : (
          <div className="row">
            {reservas.map((reserva, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow h-100">
  
                  <div className="card-body">
                    <h5 className="card-title">
                      {reserva.nombre} {reserva.apellido}
                    </h5>
  
                    <p className="card-text">
                      <strong>Correo:</strong> {reserva.correo}
                    </p>
  
                    <p className="card-text">
                      <strong>Sala:</strong> {reserva.sala}
                    </p>
  
                    <p className="card-text">
                      <strong>Fecha:</strong> {reserva.fecha}
                    </p>
  
                    <p className="card-text">
                      <strong>Hora:</strong> {reserva.hora}
                    </p>
  
                    <button
                      className="btn btn-danger w-100 mt-3"
                      onClick={() => eliminarReserva(index)}
                    >
                      Eliminar Reserva
                    </button>
  
                  </div>
  
                </div>
              </div>
            ))}
          </div>
        )}
  
      </section>
    );
  }
  
  export default ListaReserva;


