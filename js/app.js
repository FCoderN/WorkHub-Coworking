/* ============================================================
   WorkHub Coworking — app.js
   ============================================================ */

/* --- Animación fade-up al hacer scroll --- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* --- Toast global --- */
function mostrarToast(msg = '¡Listo!') {
  let t = document.getElementById('whToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3600);
}


/* ============================================================
   FORMULARIO DE REGISTRO (registro.html)
   ============================================================ */
const frmRegistro = document.getElementById('frmRegistro');
if (frmRegistro) {
  frmRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarToast('✓ Cuenta creada. Ya puedes iniciar sesión.');
    frmRegistro.reset();
    /* Aquí se haría el POST al backend en un proyecto real */
    setTimeout(() => window.location.href = 'login.html', 2000);
  });
}


/* ============================================================
   FORMULARIO DE LOGIN (login.html)
   ============================================================ */
const frmLogin = document.getElementById('frmLogin');
if (frmLogin) {
  frmLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarToast('✓ Sesión iniciada. Redirigiendo...');
    /* En producción: validar credenciales y guardar sesión */
    setTimeout(() => window.location.href = 'reserva.html', 1800);
  });
}


/* ============================================================
   FORMULARIO DE RESERVA (reserva.html)
   ============================================================ */
const frmReserva = document.getElementById('frmReserva');

if (frmReserva) {

  /* Bloquea fechas pasadas */
  const inputFecha = frmReserva.querySelector('[name="fecha"]');
  if (inputFecha) inputFecha.min = new Date().toISOString().split('T')[0];

  /* --- Cards de selección de espacio --- */
  const precios = { escritorio: 5000, reunion: 10000, oficina: 20000 };

  document.querySelectorAll('.space-radio-label').forEach(label => {
    label.addEventListener('click', () => {
      // Quita la selección anterior
      document.querySelectorAll('.space-radio-label').forEach(l => l.classList.remove('selected'));
      label.classList.add('selected');

      // Marca el radio oculto
      const radio = label.querySelector('input[type="radio"]');
      radio.checked = true;

      // Actualiza resumen
      actualizarResumen();
    });
  });

  /* Pre-seleccionar sala desde ?sala= en la URL */
  const paramSala = new URLSearchParams(window.location.search).get('sala');
  if (paramSala) {
    const target = document.querySelector(`.space-radio-label input[value="${paramSala}"]`);
    if (target) target.closest('.space-radio-label').click();
  }

  /* Actualiza fecha/hora en el resumen */
  frmReserva.querySelector('[name="fecha"]')?.addEventListener('change', actualizarResumen);
  frmReserva.querySelector('[name="hora"]')?.addEventListener('change', actualizarResumen);

  function actualizarResumen() {
    const radio  = frmReserva.querySelector('input[type="radio"]:checked');
    const fecha  = frmReserva.querySelector('[name="fecha"]')?.value;
    const hora   = frmReserva.querySelector('[name="hora"]')?.value;

    const elEspacio = document.getElementById('resEspacio');
    const elFecha   = document.getElementById('resFecha');
    const elHora    = document.getElementById('resHora');
    const elPrecio  = document.getElementById('resPrecio');

    if (elEspacio) elEspacio.textContent = radio
      ? radio.closest('.space-radio-label').querySelector('.radio-info strong').textContent
      : '—';

    if (elFecha) elFecha.textContent = fecha
      ? new Date(fecha + 'T00:00').toLocaleDateString('es-CL', { weekday:'short', day:'numeric', month:'short' })
      : '—';

    if (elHora) elHora.textContent  = hora || '—';

    if (elPrecio) elPrecio.textContent = radio
      ? `$${precios[radio.value].toLocaleString('es-CL')}`
      : '—';
  }

  /* Envío del formulario */
  frmReserva.addEventListener('submit', (e) => {
    e.preventDefault();
    const radio = frmReserva.querySelector('input[type="radio"]:checked');
    if (!radio) { mostrarToast('⚠ Selecciona un espacio primero.'); return; }
    mostrarToast('✓ Reserva confirmada. Te enviaremos un correo.');
    frmReserva.reset();
    document.querySelectorAll('.space-radio-label').forEach(l => l.classList.remove('selected'));
    actualizarResumen();
  });
}
