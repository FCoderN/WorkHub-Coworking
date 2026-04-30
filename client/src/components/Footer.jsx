import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer" className="wh-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="wh-brand mb-3 d-inline-flex align-items-center gap-2" style={{ fontSize: '1.3rem' }}>
              WORK<span className="dot">HUB</span>
            </div>
            <p>
              Soluciones de coworking flexibles para profesionales, startups y equipos de Santiago.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Navegación</h5>
            <ul className="list-unstyled" style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <li><a href="/#espacios">Espacios</a></li>
              <li><a href="/#servicios">Servicios</a></li>
              <li><Link to="/reservar">Reservar</Link></li>
              <li><Link to="/mis-reservas">Mis Reservas</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Contacto</h5>
            <p className="mb-2"><i className="bi bi-geo-alt me-2" />La Florida #3423, Santiago, Chile</p>
            <p className="mb-2"><i className="bi bi-telephone me-2" />+56 9 3324 5458</p>
            <p className="mb-3"><i className="bi bi-envelope me-2" />workbetter@workhub.com</p>
            <div className="d-flex gap-2">
              {[['bi-facebook','#'],['bi-instagram','#'],['bi-twitter-x','#'],['bi-linkedin','#']].map(([icon,href],i) => (
                <a key={i} href={href} className="social-link" target="_blank" rel="noreferrer">
                  <i className={`bi ${icon}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-copy text-center">
          © {new Date().getFullYear()} WorkHub CoWorking. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
