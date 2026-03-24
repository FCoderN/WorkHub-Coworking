import "../App.css"
import "react-bootstrap"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";


function FormReserva() {
    //Con esto podemos manejar todo sin necesidad de 
    //llamarlos unitariamente y es mas escalabble
    const [datosReserva, setDatosFormulario] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        sala: "",
        fecha: "",
        hora: ""
    });

    const [mostrarPopup, setMostrarPopup] = useState(false);
    const cerrarPopup = () => setMostrarPopup(false);

    // Funcion para controlar los input que ingresa los usuarios
    const controlarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatosFormulario({
            ...datosReserva,
            [name]: value
        });
    };
    // Funcion para poder procesar el envio de datos
    const controlarEnvio = (evento) => {
        evento.preventDefault();
        console.log("¡Reserva lista para procesar!", datosReserva);
        setMostrarPopup(true);
    };

    

    return (
        <main>

            <section>
                <div className="container">
                    <h2 id="formularioTitulo" className="text-center mb-3">Reserva tu Espacio</h2>

                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">

                            <div className="card shadow">
                                <div className="card-body">

                                    <form id="formulario" onSubmit={controlarEnvio}>

                                        <div className="mb-3">
                                            <label className="form-label">Nombre</label>
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            name="nombre" 
                                            placeholder="Tu nombre" required
                                            value={datosReserva.nombre}
                                            onChange={controlarCambio}/>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Apellido</label>
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            name="apellido" 
                                            placeholder="Tu apellido" required
                                            value={datosReserva.apellido}
                                            onChange={controlarCambio}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Correo</label>
                                            <input 
                                            type="email" 
                                            className="form-control" 
                                            name="correo" 
                                            placeholder="nombre@email.com" required
                                            value={datosReserva.correo}
                                            onChange={controlarCambio}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Selecciona el espacio</label>
                                            <select 
                                            className="form-control" 
                                            name="sala" required
                                            value={datosReserva.sala}
                                            onChange={controlarCambio}
                                            >
                                                <option value="">-- Elige una opción --</option>
                                                <option value="escritorio">Escritorio Individual</option>
                                                <option value="reunion">Sala de Reuniones</option>
                                                <option value="oficina">Oficina Privada</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Día</label>
                                            <input 
                                            type="date" 
                                            className="form-control" 
                                            name="fecha" required
                                            value={datosReserva.fecha}
                                            onChange={controlarCambio}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Hora</label>
                                            <input 
                                            type="time" 
                                            className="form-control" 
                                            name="hora" 
                                            min="08:00" 
                                            max="18:00" required
                                            value = {datosReserva.hora}
                                            onChange={controlarCambio}
                                            />
                                        </div>

                                        <p className="text-muted small">
                                            Horarios:<br/>
                                                Lunes a Viernes: 08:00 - 18:00<br/>
                                                    Sábado: 08:00 - 14:00
                                                </p>

                                                <button type="submit" className="btn-gold w-100">Reservar</button>

                                            </form>

                                        </div>
                                </div>

                            </div>
                        </div>
                    </div>
            </section>
            <Modal show={mostrarPopup} onHide={cerrarPopup} centered>
                <Modal.Header closeButton>
                    <Modal.Title>¡Reserva Exitosa!</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    
                    <p>Gracias por elegir nuestro espacio, <strong>{datosReserva.nombre}</strong>.</p>
                    <p>Tu reserva para el día <strong>{datosReserva.fecha}</strong> a las <strong>{datosReserva.hora}</strong> ha sido registrada correctamente.</p>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="success" onClick={cerrarPopup}>
                        Entendido
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
};

export default FormReserva;