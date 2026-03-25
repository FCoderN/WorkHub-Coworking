function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-5">
            <div className="container text-center text-md-start">
                <div className="row">


                    <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
                        <h5 className="text-uppercase fw-bold mb-4">
                            WorkHub CoWorking
                        </h5>
                        <p>
                            Un espacio moderno y profesional para trabajar, crear y colaborar.
                            Ofrecemos salas equipadas, conexión rápida y un ambiente ideal
                            para emprendedores y empresas.
                        </p>
                    </div>


                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Enlaces
                        </h6>
                        <p>
                            <a href="#hero" className="text-white text-decoration-none">
                                Inicio
                            </a>
                        </p>
                        <p>
                            <a href="#seccion-oficinas" className="text-white text-decoration-none">
                                Espacios
                            </a>
                        </p>
                        <p>
                            <a href="#formulario" className="text-white text-decoration-none">
                                Reservas
                            </a>
                        </p>
                    </div>


                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-4">
                            Contacto
                        </h6>
                        <p>📍 Valparaíso, Chile</p>
                        <p>📧 contacto@workhub.cl</p>
                        <p>📞 +56 9 1234 5678</p>
                    </div>

                </div>

                <hr className="mb-4" />


                <div className="text-center">
                    <p className="mb-0">
                        © {new Date().getFullYear()} WorkHub CoWorking — Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;