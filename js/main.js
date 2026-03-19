import { Reserva } from "./models/reserva.js";

const formulario = document.querySelector("#formulario");
const lista = document.querySelector("#lista-reservas");
const toast = document.querySelector("#toast");

/**
 * Evento submit del formulario
 */
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(formulario));

    const reserva = new Reserva(datos);

    guardarReserva(reserva);
    mostrarReserva(reserva);

    mostrarToast("Reserva creada con éxito ✅");

    formulario.reset();
});

/**
 * Mostrar reserva en pantalla
 */
function mostrarReserva(reserva) {
    const div = document.createElement("div");
    div.classList.add("card", "p-3", "mb-2", "shadow-sm");

    div.textContent = reserva.resumen;

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
    cargarReservas();
});