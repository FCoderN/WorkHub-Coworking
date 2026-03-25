import "../App.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
            <div className="container-fluid">
                <a
                    className="navbar-brand d-flex align-items-center gap-2"
                    href="index.html"
                >
                    WORK<span className="dot">HUB</span>
                    <img
                        src="https://img.icons8.com/?size=256w&id=yIUhxhKvbhFj&format=png&color=FFFFFF"
                        width={40}
                        alt="logo"
                    />
                </a>
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNav"
                    aria-controls="mainNav"
                    aria-expanded="false"
                    aria-label="Abrir menú"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav me-auto gap-lg-1">
                        <li className="nav-item">
                            <a className="nav-link active" href="index.html">
                                Inicio
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#seccion-oficinas">
                                Espacios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#servicios">
                                Servicios
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#footer">
                                Contacto
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="mailto:hola@workhub.cl">
                                        Empresas
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#footer">
                                        Redes Sociales
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/* Botones de Registro e Inicio de Sesión */}
                    <div className="nav-auth">
                        <a href="#formulario" className="btn-nav-gold">
                            Reserva Ahora!
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
