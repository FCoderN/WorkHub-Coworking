import "../App.css";
import "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function FormReserva() {

    const [datosReserva, setDatosFormulario] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        sala: "",
        fecha: "",
        hora: ""
    });

    const [mostrarPopup, setMostrarPopup] = useState(false);

    const cerrarPopup = () => {
        setMostrarPopup(false); // 1. Oculta el popup
        setDatosFormulario({    // 2. Limpia los datos para el siguiente cliente
            nombre: "",
            apellido: "",
            correo: "",
            sala: "",
            fecha: "",
            hora: ""
        });
    };

    // Fecha de hoy (para bloquear fechas pasadas)
    const hoy = new Date().toISOString().split("T")[0];

    // Controlar cambios en inputs
    const controlarCambio = (evento) => {
        const { name, value } = evento.target;
    
        // Expresión regular: solo letras y espacios
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/;
    
        // Validar solo nombre y apellido
        if (name === "nombre" || name === "apellido") {
    
            if (!soloLetras.test(value)) {
                return; // Bloquea caracteres no permitidos
            }
    
        }
    
        setDatosFormulario({
            ...datosReserva,
            [name]: value
        });
    };

    // Validaciones
    const controlarEnvio = (evento) => {
        evento.preventDefault();

        const { 
            nombre, 
            apellido, 
            correo, 
            fecha, 
            hora } = datosReserva;

        // Expresiones regulares
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validar nombre
        if (!soloLetras.test(nombre)) {
            alert("El nombre solo debe contener letras");
            return;
        }

        // Validar apellido
        if (!soloLetras.test(apellido)) {
            alert("El apellido solo debe contener letras");
            return;
        }

        // Validar correo
        if (!correoValido.test(correo)) {
            alert("El correo debe tener formato válido (ej: nombre@gmail.com)");
            return;
        }

        // Validar fecha pasada
        const fechaSeleccionada = new Date(fecha);
        const fechaActual = new Date(hoy);

        if (fechaSeleccionada < fechaActual) {
            alert("No se permiten fechas pasadas");
            return;
        }

        // Día de la semana
        const diaSemana = fechaSeleccionada.getDay();

        /*
        0 Domingo
        6 Sábado
        */

        // Domingo bloqueado
        if (diaSemana === 0) {
            alert("Los domingos no se trabaja");
            return;
        }

        // Validar horarios
        if (diaSemana >= 1 && diaSemana <= 5) {

            if (hora < "08:00" || hora > "17:00") {
                alert("Horario de lunes a viernes: 08:00 a 17:00");
                return;
            }

        }

        if (diaSemana === 6) {

            if (hora < "08:00" || hora > "13:00") {
                alert("Horario sábado: 08:00 a 13:00");
                return;
            }

        }

        // Convertir a JSON
        const reservaJSON = JSON.stringify(datosReserva, null, 2);

        console.log("Reserva en JSON:");
        console.log(reservaJSON);

        // Mostrar popup
        setMostrarPopup(true);

        
        };

    return (
        <main>

            <section>
                <div className="container">

                    <h2 className="text-center mb-3">
                        Reserva tu Espacio
                    </h2>

                    <div className="row justify-content-center">

                        <div className="col-md-6 col-lg-4">

                            <div className="card shadow">

                                <div className="card-body">

                                    <form onSubmit={controlarEnvio}>

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Nombre
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nombre"
                                                placeholder="Tu nombre"
                                                required
                                                value={datosReserva.nombre}
                                                onChange={controlarCambio}
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Apellido
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="apellido"
                                                placeholder="Tu apellido"
                                                required
                                                value={datosReserva.apellido}
                                                onChange={controlarCambio}
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Correo
                                            </label>

                                            <input
                                                type="email"
                                                className="form-control"
                                                name="correo"
                                                placeholder="nombre@gmail.com"
                                                required
                                                value={datosReserva.correo}
                                                onChange={controlarCambio}
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Selecciona el espacio
                                            </label>

                                            <select
                                                className="form-control"
                                                name="sala"
                                                required
                                                value={datosReserva.sala}
                                                onChange={controlarCambio}
                                            >

                                                <option value="">
                                                    -- Elige una opción --
                                                </option>

                                                <option value="escritorio">
                                                    Escritorio Individual
                                                </option>

                                                <option value="reunion">
                                                    Sala de Reuniones
                                                </option>

                                                <option value="oficina">
                                                    Oficina Privada
                                                </option>

                                            </select>

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Día
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="fecha"
                                                min={hoy}
                                                required
                                                value={datosReserva.fecha}
                                                onChange={controlarCambio}
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Hora
                                            </label>

                                            <input
                                                type="time"
                                                className="form-control"
                                                name="hora"
                                                required
                                                value={datosReserva.hora}
                                                onChange={controlarCambio}
                                            />

                                        </div>

                                        <p className="text-muted small">

                                            Horarios:

                                            <br />

                                            Lunes a Viernes:
                                            08:00 - 17:00

                                            <br />

                                            Sábado:
                                            08:00 - 13:00

                                        </p>

                                        <button
                                            type="submit"
                                            className="btn-gold w-100"
                                        >

                                            Reservar

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <Modal
                show={mostrarPopup}
                onHide={cerrarPopup}
                centered
            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        ¡Reserva Exitosa!

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <p>

                        Gracias por elegir nuestro espacio,
                        <strong>
                            {" "}
                            {datosReserva.nombre}
                        </strong>.

                    </p>

                    <p>

                        Tu reserva ha sido registrada correctamente.

                    </p>

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="success"
                        onClick={cerrarPopup}
                    >

                        Entendido

                    </Button>

                </Modal.Footer>

            </Modal>

        </main>
    );
}

export default FormReserva;