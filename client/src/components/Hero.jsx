import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <header id="hero" className="hero-section">
      <div className="hero-overlay" />
      <div className="container hero-content text-center">
        <p className="section-label fade-up">Bienvenido a WorkHub</p>
        <h1 className="hero-title fade-up-2">
          Espacios donde<br /><span>las ideas</span> florecen
        </h1>
        <p className="hero-subtitle mt-3 mb-5 fade-up-2">
          Conecta, crea y colabora en el mejor entorno profesional de Santiago.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap fade-up-3">
          <Link to="/reservar" className="btn-hero-primary">
            <i className="bi bi-calendar-check me-2" />
            Reservar un Espacio
          </Link>
          <a href="#espacios" className="btn-hero-outline">
            <i className="bi bi-grid me-2" />
            Conocer las Salas
          </a>
        </div>
      </div>
    </header>
  );
}
