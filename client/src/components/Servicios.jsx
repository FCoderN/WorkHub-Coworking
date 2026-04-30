const servicesList = [
  { icon: 'bi-wifi',        title: 'WiFi de Alta Velocidad', desc: 'Fibra óptica simétrica en todos los espacios.' },
  { icon: 'bi-cup-hot',     title: 'Café & Snacks',          desc: 'Disponibles sin costo adicional durante tu jornada.' },
  { icon: 'bi-printer',     title: 'Impresión',              desc: 'Impresora y escáner para todos los usuarios.' },
  { icon: 'bi-bicycle',     title: 'Estacionamiento',        desc: 'Para bicicletas y motos sin costo.' },
  { icon: 'bi-shield-check',title: 'Seguridad 24/7',         desc: 'Acceso controlado y cámaras de seguridad.' },
  { icon: 'bi-headset',     title: 'Soporte Técnico',        desc: 'Asistencia técnica disponible en horario de oficina.' },
];

export default function Servicios() {
  return (
    <section id="servicios" className="section" style={{ background: 'var(--dark)' }}>
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-5 mx-auto text-center">
            <p className="section-label">Lo que incluye</p>
            <h2 className="section-title">Todo lo que<br /><em>necesitas</em></h2>
            <div className="divider mx-auto" />
          </div>
        </div>

        <div className="row g-3">
          {servicesList.map((s, i) => (
            <div key={i} className="col-6 col-lg-4">
              <div className="service-item">
                <div className="service-icon"><i className={`bi ${s.icon}`} /></div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
