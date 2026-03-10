const formulario = document.getElementById("formulario");

        formulario.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita que se recargue la página

            alert("✅ Registro exitoso");

            formulario.reset(); // Limpia todos los campos
        });
