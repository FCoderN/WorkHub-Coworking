import "../App.css";
import "react-bootstrap";


function Servicios() {

    return (
                <section id="servicios" className="section">
                <div className="container">

                    <div className="row mb-5">
                        <div className="col-lg-5 mx-auto text-center">
                            <p className="section-label">Lo que Incluye</p>
                            <h2 className="section-title">Todo lo que<br/><em>necesitas</em></h2>
                            <div className="divider mx-auto"></div>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-6 col-lg-3">
                            <div className="service-item">
                                <div className="service-icon"><i className="bi bi-wifi"></i></div>
                                <h4>WiFi de Alta Velocidad</h4>
                                <p>Fibra óptica simétrica en todos los espacios.</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="service-item">
                                <div className="service-icon"><i className="bi bi-cup-hot"></i></div>
                                <h4>Café & Snacks</h4>
                                <p>Disponibles sin costo adicional.</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="service-item">
                                <div className="service-icon"><i className="bi bi-printer"></i></div>
                                <h4>Impresión</h4>
                                <p>Impresora y escáner para todos.</p>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="service-item">
                                <div className="service-icon"><i className="bi bi-bicycle"></i></div>
                                <h4>Estacionamiento</h4>
                                <p>Bicicletas y motos sin costo.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        
    );
};

export default Servicios;