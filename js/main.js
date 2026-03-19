import { Reserva } from "./models/reserva.js";

const formulario = document.querySelector("#formulario");
const lista = document.querySelector("#lista-reservas");
const toast = document.querySelector("#toast");
const seccionReservas = document.querySelector("#seccion-reservas");

/**
 * Evento submit del formulario
 */
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(formulario));

    const fecha = new Date(datos.fecha + "T00:00:00");
    const dia = fecha.getDay();

    if (dia === 0) {
        mostrarToast("No se puede reservar los domingos ❌");
        return;
    }

    if (!datos.hora) {
        mostrarToast("Debes seleccionar una hora ❌");
        return;
    }
    const reserva = new Reserva(datos);

    guardarReserva(reserva);
    renderizarReservas();

    mostrarToast("Reserva creada con éxito ✅");

    formulario.reset();
});

/*
    * Restricción de horas según día seleccionado
 */

const inputFecha = document.querySelector('[name="fecha"]');
const selectHora = document.querySelector('#hora');

inputFecha.addEventListener("change", () => {
    const fecha = new Date(inputFecha.value + "T00:00:00");
    const dia = fecha.getDay();

    selectHora.innerHTML = '<option value="">-- Selecciona una hora --</option>';

    if (dia === 0) {
        mostrarToast("No se puede reservar los domingos ❌");
        inputFecha.value = "";
        return;
    }

    let inicio, fin;

    if (dia === 6) {
        // sábado
        inicio = 8;
        fin = 13;
    } else {
        // lunes a viernes
        inicio = 8;
        fin = 17;
    }

    for (let i = inicio; i <= fin; i++) {
        const hora = `${i.toString().padStart(2, '0')}:00`;

        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;

        selectHora.appendChild(option);
    }
});

/**
 * Restricción de letras en nombre y apellido
 */

const inputNombre = formulario.querySelector('input[name="nombre"]');
const inputApellido = formulario.querySelector('input[name="apellido"]');

const regexLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

// BLOQUEAR TECLAS
function bloquearNoLetras(e) {
    const tecla = e.key;

    if (
        tecla === "Backspace" ||
        tecla === "Tab" ||
        tecla === "ArrowLeft" ||
        tecla === "ArrowRight" ||
        tecla === "Delete"
    ) return;

    if (!regexLetras.test(tecla)) {
        e.preventDefault();
    }
}

// BLOQUEAR PEGADO
function bloquearPegado(e) {
    const texto = (e.clipboardData || window.clipboardData).getData("text");

    if (!regexLetras.test(texto)) {
        e.preventDefault();
        mostrarToast("Solo letras permitidas ❌");
    }
}

inputNombre.addEventListener("keydown", bloquearNoLetras);
inputApellido.addEventListener("keydown", bloquearNoLetras);

inputNombre.addEventListener("paste", bloquearPegado);
inputApellido.addEventListener("paste", bloquearPegado);

/**
 * Mostrar reserva en pantalla
 */
function mostrarReserva(reserva) {
    const div = document.createElement("div");
    div.classList.add("reserva-card");

    div.innerHTML = `
        <div>
            <div class="reserva-nombre">
                ${reserva.nombre} ${reserva.apellido}
            </div>
            <div class="reserva-detalle">
                ${reserva.resumen}
            </div>
        </div>

        <button class="btn-eliminar" data-id="${reserva.id}">
            Eliminar
        </button>
    `;

    lista.appendChild(div);
}

/**
 * Guardar en localStorage
 */
function guardarReserva(reserva) {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    reservas.push(reserva.toJSON());

    localStorage.setItem("reservas", JSON.stringify(reservas));
}

/**
 * Cargar reservas al iniciar
 */
function cargarReservas() {
    const data = JSON.parse(localStorage.getItem("reservas")) || [];

    data.forEach(item => {
    const reserva = Reserva.fromJSON(item);
    mostrarReserva(reserva);
    });
}

/**
 * Eliminar Reserva
 */
function eliminarReserva(id) {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    reservas = reservas.filter(r => r.id !== id);

    localStorage.setItem("reservas", JSON.stringify(reservas));

    renderizarReservas();

    mostrarToast("Reserva eliminada ❌");
}

/**
 * Renderizar
 */
function renderizarReservas() {
    lista.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("reservas")) || [];

    if (data.length === 0) {
        seccionReservas.classList.add("hidden");
        return;
    }

    seccionReservas.classList.remove("hidden");

    data.forEach(item => {
        const reserva = Reserva.fromJSON(item);
        mostrarReserva(reserva);
    });
}


/**
 * Mostrar toast simple
 */
function mostrarToast(mensaje) {
    if (!toast) return;

    toast.textContent = mensaje;
    toast.classList.add("show");

    setTimeout(() => {
    toast.classList.remove("show");
    }, 3000);
}

/**
 * Inicialización
 */
document.addEventListener("DOMContentLoaded", () => {
    renderizarReservas();
});

/**
 * Botón eliminar
 */
lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const id = Number(e.target.dataset.id);
        eliminarReserva(id);
    }
});