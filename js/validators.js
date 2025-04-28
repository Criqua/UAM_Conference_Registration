document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
  
    // Función que permite mostrar el mensaje de error junto al campo
    function showError(id, message) {
        const container = document.getElementById(id);
        const span = container.querySelector("span");
        container.classList.add("active");
        span.textContent = message;
    }
  
    // Función que limpian todos los errores visibles iniciales por cada registro, a fin de que no se repitan
    function clearErrors() {
        document.querySelectorAll(".error-msg").forEach(el => {
            el.classList.remove("active");
            el.querySelector("span").textContent = "";
        });
    }
  
    form.addEventListener("submit", event => {
        event.preventDefault();
        clearErrors();
  
        let isValid = true;
        const errorList = [];
    
        // Campos a validar
        const name = document.getElementById("name").value.trim();
        const email  = document.getElementById("email").value.trim();
        const major = document.getElementById("major").value.trim();
        const events = Array.from(
            document.querySelectorAll('input[name="events"]:checked')
        );
    
        // 1) name: no puede estar vacío y sólo letras/espacios
        if (!name) {
            isValid = false;
            showError("errorName", "El nombre no puede estar vacío.");
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name)) {
            isValid = false;
            showError("errorName", "El nombre sólo debe contener letras y espacios.");
        }
    
        // 2) Correo institucional @uamv.edu.ni
        const emailRegex = /^[^\s@]+@uamv\.edu\.ni$/i;
        if (!email) {
            isValid = false;
            showError("errorEmail", "El correo no puede estar vacío.");
        } else if (!emailRegex.test(email)) {
            isValid = false;
            showError("errorEmail", "Formato inválido. Usa tu correo institucional de dominio \"@uamv.edu.ni.\"");
        }

        // 3) Selección de una carrera
        if (major === "") {
            isValid = false;
            showError("errorMajor", "Seleccione su carrera de la lista desplegable.");
        }
  
        // 4) Conferencias: al menos una
        if (events.length === 0) {
            isValid = false;
            showError("errorEvents", "Debes elegir al menos una conferencia.");
        }
    
        if (!isValid) {
            return;
        }
  
        // Si todo es válido, se muestra un modal de éxito
        Swal.fire({
            title: "¡Registro exitoso!",
            text: "Te has registrado correctamente.",
            icon: "success",
            confirmButtonText: "OK"
        }).then(() => {
            form.reset();
            clearErrors();
        });
    });
});  