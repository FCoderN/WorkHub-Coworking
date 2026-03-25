function Espacios() {
  const oficinas = [
    {
      img: '/recursos/oficina1.jpg',
      titulo: 'Escritorio Individual',
      capacidad: '1 persona',
      equipamiento: 'Escritorio, silla ergonómica, WiFi',
      precio: '$5.000 / hora'
    },
    {
      img: '/recursos/oficina3.jpg',
      titulo: 'Sala de Reuniones',
      capacidad: '8 personas',
      equipamiento: 'Pantalla, pizarra, WiFi',
      precio: '$10.000 / hora'
    },
    {
      img: '/recursos/oficina5.jpg',
      titulo: 'Oficina Privada',
      capacidad: '4 personas',
      equipamiento: 'Escritorios, pantalla, aire acondicionado, WiFi',
      precio: '$20.000 / hora'
    }
  ];

  return (
    <section id="seccion-oficinas" className="d-flex align-items-center"
      style={{ minHeight: '100vh', padding: '80px 0 40px' }}>
      <div className="container-xl">
        <h2 className="display-5 text-center mb-5 fw-light">Oficinas Disponibles</h2>

        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div id="carruselOficinas" className="carousel slide" data-bs-ride="carousel">

              <div className="carousel-inner">
                {oficinas.map((ofi, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <div className="card h-100 border-0 shadow-sm">
                      <img src={ofi.img} className="card-img-top" alt={ofi.titulo} />
                      <div className="card-body text-center d-flex flex-column p-4">
                        <h5 className="card-title fw-bold">{ofi.titulo}</h5>
                        <p className="card-text">
                          Capacidad: {ofi.capacidad}<br />
                          Equipamiento: {ofi.equipamiento}<br />
                          Horario: 08:00 - 18:00
                        </p>
                        <span className="precio-destacado mt-auto fw-bold text-primary">
                          {ofi.precio}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="carousel-control-prev" type="button"
                data-bs-target="#carruselOficinas" data-bs-slide="prev">
                <span className="carousel-control-prev-icon rounded-circle p-3"
                  aria-hidden="true"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button"
                data-bs-target="#carruselOficinas" data-bs-slide="next">
                <span className="carousel-control-next-icon rounded-circle p-3"
                  aria-hidden="true"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></span>
                <span className="visually-hidden">Siguiente</span>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Espacios;
