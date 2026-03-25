function Hero() {
    const bgStyle = {
        background: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80%27) center/cover no-repeat`
    };

    return (
        <header
            id="hero"
            className="vh-100 d-flex align-items-center position-relative"
            style={bgStyle}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

            <div className="container position-relative text-center text-white" style={{ zIndex: 1 }}>
                <h1 className="display-2 fw-bold mb-4">WorkHub CoWorking</h1>
                <p className="lead mb-5 fs-4">
                    Conecta, crea y colabora en el mejor entorno profesional.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <a href="#formulario" className="btn btn-warning btn-lg px-4 py-2 fw-semibold">
                        Reservar un Espacio
                    </a>
                    <a href="#seccion-oficinas" className="btn btn-outline-light btn-lg px-4 py-2 fw-semibold">
                        Conocer las Salas
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Hero;