function Servicios() {
  const items = [
    { icon: 'bi-wifi',    titulo: 'WiFi de Alta Velocidad', desc: 'Fibra óptica simétrica en todos los espacios.' },
    { icon: 'bi-cup-hot', titulo: 'Café & Snacks',          desc: 'Disponibles sin costo adicional.' },
    { icon: 'bi-printer', titulo: 'Impresión',              desc: 'Impresora y escáner para todos.' },
    { icon: 'bi-bicycle', titulo: 'Estacionamiento',        desc: 'Bicicletas y motos sin costo.' },
  ];

  return (
    <section id="servicios" className="section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-5 mx-auto text-center">
            <p className="section-label">Lo que Incluye</p>
            <h2 className="section-title">Todo lo que<br /><em>necesitas</em></h2>
            <div className="divider mx-auto"></div>
          </div>
        </div>
        <div className="row g-3">
          {items.map((item, i) => (
            <div className="col-6 col-lg-3" key={i}>
              <div className="service-item">
                <div className="service-icon"><i className={`bi ${item.icon}`}></i></div>
                <h4>{item.titulo}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
