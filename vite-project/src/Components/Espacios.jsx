import container from "react-bootstrap/Container":
import { images } from "../images.jsx":

function Espacios() {
    // Datos de las oficinas en un array (en vez de repetir HTML)
    const oficinas = [
        {
            img: "/img/oficina1.jpg",
            titulo: "Escritorio Individual",
            capacidad: "1 persona",
            equipamiento: "Escritorio, silla ergonómica, WiFi",
            precio: "$5.000 / hora",
        },
        {
            img: "/img/oficina3.jpg",
            titulo: "Sala de Reuniones",
            capacidad: "8 personas",
            equipamiento: "Pantalla, pizarra, WiFi",
            precio: "$10.000 / hora",
        },
        {
            img: "/img/oficina5.jpg",
            titulo: "Oficina Privada",
            capacidad: "4 personas",
            equipamiento: "Escritorios, pantalla, A/C, WiFi",
            precio: "$20.000 / hora",
        },
    ];

    return (
        <section
            id="seccion-oficinas"
            className="d-flex align-items-center"
            style={{ minHeight: "100vh", padding: "80px 0 40px" }}
        >
            <div className="container-xl">
                <h2 className="display-5 text-center mb-5 fw-light">
                    Oficinas Disponibles
                </h2>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div
                            id="carruselOficinas"
                            className="carousel slide"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="card h-100 tarjeta-oficina border-0 shadow-sm">
                                        <img
                                            src="recursos/oficina1.jpg"
                                            className="card-img-top"
                                            alt="Coworking Abierto"
                                        />
                                        <div className="card-body text-center d-flex flex-column p-4">
                                            <h5 className="card-title fw-bold">
                                                Escritorio individual
                                            </h5>
                                            <p className="card-text">
                                                Capacidad: 1 persona
                                                <br />
                                                Equipamiento: Escritorio, silla ergonómica, WiFi
                                                <br />
                                                Horario: 08:00 - 18:00
                                                <br />
                                            </p>
                                            <span className="precio-destacado mt-auto fw-bold text-primary">
                                                $5.000 / hora
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="card h-100 tarjeta-oficina border-0 shadow-sm">
                                        <img
                                            src="recursos/oficina3.jpg"
                                            className="card-img-top"
                                            alt="Oficina Privada"
                                        />
                                        <div className="card-body text-center d-flex flex-column p-4">
                                            <h5 className="card-title fw-bold">Sala de Reuniones</h5>
                                            <p className="card-text">
                                                Capacidad: 8 personas
                                                <br />
                                                Equipamiento: Pantalla, pizarra, WiFi
                                                <br />
                                                Horario: 08:00 - 18:00
                                                <br />
                                            </p>
                                            <span className="precio-destacado mt-auto fw-bold text-primary">
                                                $10.000 / hora
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="card h-100 tarjeta-oficina border-0 shadow-sm">
                                        <img
                                            src="recursos/oficina5.jpg"
                                            className="card-img-top"
                                            alt="Sala de Reuniones"
                                        />
                                        <div className="card-body text-center d-flex flex-column p-4">
                                            <h5 className="card-title fw-bold">Oficina Privada</h5>
                                            <p className="card-text">
                                                Capacidad: 4 personas
                                                <br />
                                                Equipamiento: Escritorios, pantalla, aire acondicionado,
                                                WiFi
                                                <br />
                                                Horario: 08:00 - 18:00
                                                <br />
                                            </p>
                                            <span className="precio-destacado mt-auto fw-bold text-primary">
                                                $20.000 / hora
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carruselOficinas"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon rounded-circle p-3"
                                    aria-hidden="true"
                                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                                />
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carruselOficinas"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon rounded-circle p-3"
                                    aria-hidden="true"
                                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                                />
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
