import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuth } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <nav className={`wh-navbar navbar navbar-expand-lg fixed-top${scrolled ? ' scrolled' : ''}`}>
      <div className="container-fluid px-4">
        <Link className="navbar-brand wh-brand d-flex align-items-center gap-2" to="/" onClick={() => setOpen(false)}>
          WORK<span className="dot">HUB</span>
          <img
            src="https://img.icons8.com/?size=256w&id=yIUhxhKvbhFj&format=png&color=FFFFFF"
            width="36" alt="logo"
          />
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse${open ? ' show' : ''}`}>
          <ul className="navbar-nav me-auto gap-lg-1">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={() => setOpen(false)} end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#espacios" onClick={() => setOpen(false)}>Espacios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#servicios" onClick={() => setOpen(false)}>Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#footer" onClick={() => setOpen(false)}>Contacto</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuth ? (
              <>
                <span className="text-muted small me-1" style={{ color: 'rgba(255,255,255,.5)', fontSize: '.82rem' }}>
                  Hola, {user.name.split(' ')[0]}
                </span>
                <NavLink className="btn-gold" to="/mis-reservas" onClick={() => setOpen(false)}>
                  Mis Reservas
                </NavLink>
                <button className="btn-outline-gold" onClick={handleLogout}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <NavLink className="btn-outline-gold" to="/login" onClick={() => setOpen(false)}>
                  Iniciar Sesión
                </NavLink>
                <NavLink className="btn-gold" to="/reservar" onClick={() => setOpen(false)}>
                  Reservar Ahora
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
