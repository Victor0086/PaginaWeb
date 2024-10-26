document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const nombreCompleto = document.getElementById("nombreCompleto");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const direccion = document.getElementById("direccion"); // Asumiendo que tienes un campo para dirección
    
    form.addEventListener("submit", function(event) {
        // Evita el envío del formulario si hay errores
        event.preventDefault();

        let isValid = true;
        let errorMessage = "";

        // Validación de campos no vacíos (excepto dirección)
        if (!nombreCompleto.value.trim()) {
            isValid = false;
            errorMessage += "El nombre completo es obligatorio.\n";
        }
        if (!nombreUsuario.value.trim()) {
            isValid = false;
            errorMessage += "El nombre de usuario es obligatorio.\n";
        }
        if (!email.value.trim()) {
            isValid = false;
            errorMessage += "El correo electrónico es obligatorio.\n";
        }
        if (!password.value.trim()) {
            isValid = false;
            errorMessage += "La contraseña es obligatoria.\n";
        }
        if (!confirmPassword.value.trim()) {
            isValid = false;
            errorMessage += "La confirmación de la contraseña es obligatoria.\n";
        }
        if (!fechaNacimiento.value.trim()) {
            isValid = false;
            errorMessage += "La fecha de nacimiento es obligatoria.\n";
        }

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            isValid = false;
            errorMessage += "El correo electrónico no tiene un formato válido.\n";
        }

        // Validación de contraseñas iguales
        if (password.value !== confirmPassword.value) {
            isValid = false;
            errorMessage += "Las contraseñas no coinciden.\n";
        }

        // Validación de longitud de la contraseña
        if (password.value.length < 6 || password.value.length > 18) {
            isValid = false;
            errorMessage += "La contraseña debe tener entre 6 y 18 caracteres.\n";
        }

        // Validación de complejidad de la contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (password.value && !passwordRegex.test(password.value)) {
            isValid = false;
            errorMessage += "La contraseña debe contener al menos una letra mayúscula y un número.\n";
        }

        // Validación de la edad mínima
        const today = new Date();
        const birthDate = new Date(fechaNacimiento.value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 13) {
            isValid = false;
            errorMessage += "Debes tener al menos 13 años para registrarte.\n";
        }

        if (!isValid) {
            alert(errorMessage);
        } else {
            form.submit();
        }
    });

    // Agregar botón de limpiar el formulario
    const clearButton = document.createElement("button");
    clearButton.type = "button"; // Tipo 'button' para evitar que envíe el formulario
    clearButton.textContent = "Limpiar";
    clearButton.addEventListener("click", function() {
        form.reset(); // Limpiar el formulario
    });

    form.appendChild(clearButton); // Agrega el botón al formulario
});
