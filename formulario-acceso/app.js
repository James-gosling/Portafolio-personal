// Esperar a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
  // Referencia al formulario y al banner de confirmación
  const form = document.getElementById("accessForm");
  const successBanner = document.getElementById("formSuccess");

  // Captura de los campos del formulario por su ID
  const fields = {
    fullname: document.getElementById("fullname"),
    email: document.getElementById("email"),
    role: document.getElementById("role"),
    password: document.getElementById("password"),
    terms: document.getElementById("terms"),
    environment: () => document.querySelector('input[name="environment"]:checked')
  };

  // Muestra el mensaje de error y resalta el campo en rojo
  const setError = (elementId, message) => {
    const group = document.getElementById(`group-${elementId}`);
    const errorSpan = document.getElementById(`error-${elementId}`);
    if (group) group.classList.add("has-error");
    if (errorSpan) errorSpan.textContent = message;
  };

  // Limpia el mensaje y retira el borde de error
  const clearError = (elementId) => {
    const group = document.getElementById(`group-${elementId}`);
    const errorSpan = document.getElementById(`error-${elementId}`);
    if (group) group.classList.remove("has-error");
    if (errorSpan) errorSpan.textContent = "";
  };

  // Expresión regular para comprobar estructura básica de correo
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email.trim());
  };

  // 1. Validación de nombre (campo obligatorio y longitud mínima)
  const validateFullname = () => {
    const val = fields.fullname.value.trim();
    if (val === "") {
      setError("fullname", "El nombre completo es obligatorio.");
      return false;
    }
    if (val.length < 3) {
      setError("fullname", "Debe contener al menos 3 caracteres.");
      return false;
    }
    clearError("fullname");
    return true;
  };

  // 2. Validación de correo (obligatorio y formato válido)
  const validateEmail = () => {
    const val = fields.email.value.trim();
    if (val === "") {
      setError("email", "El correo electrónico es obligatorio.");
      return false;
    }
    if (!isValidEmail(val)) {
      setError("email", "Ingresa un formato de correo válido (ej. usuario@dominio.com).");
      return false;
    }
    clearError("email");
    return true;
  };

  // 3. Validación de lista desplegable (selección obligatoria)
  const validateRole = () => {
    if (fields.role.value === "") {
      setError("role", "Selecciona una opción de la lista.");
      return false;
    }
    clearError("role");
    return true;
  };

  // 4. Validación de contraseña (mínimo 8 caracteres)
  const validatePassword = () => {
    const val = fields.password.value;
    if (val === "") {
      setError("password", "La contraseña es obligatoria.");
      return false;
    }
    if (val.length < 8) {
      setError("password", `Mínimo 8 caracteres (actualmente tienes ${val.length}).`);
      return false;
    }
    clearError("password");
    return true;
  };

  // 5. Validación de radio button (al menos uno seleccionado)
  const validateEnvironment = () => {
    if (!fields.environment()) {
      setError("environment", "Selecciona un entorno de trabajo.");
      return false;
    }
    clearError("environment");
    return true;
  };

  // 6. Validación de casilla de verificación (checkbox obligatorio)
  const validateTerms = () => {
    if (!fields.terms.checked) {
      setError("terms", "Debes marcar esta casilla para continuar.");
      return false;
    }
    clearError("terms");
    return true;
  };

  // Validaciones en tiempo real al interactuar con los campos
  fields.fullname.addEventListener("blur", validateFullname);
  fields.email.addEventListener("blur", validateEmail);
  fields.role.addEventListener("change", validateRole);
  fields.password.addEventListener("input", () => {
    if (fields.password.value.length >= 8) clearError("password");
  });
  fields.terms.addEventListener("change", validateTerms);
  document.querySelectorAll('input[name="environment"]').forEach((radio) => {
    radio.addEventListener("change", validateEnvironment);
  });

  // Validación final al presionar el botón de envío
  form.addEventListener("submit", (event) => {
    // Evitar que la página se recargue o envíe datos con errores
    event.preventDefault();
    successBanner.classList.remove("active");

    // Ejecutar todas las comprobaciones
    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isRoleValid = validateRole();
    const isPasswordValid = validatePassword();
    const isEnvValid = validateEnvironment();
    const isTermsValid = validateTerms();

    // Detener el proceso si cualquiera falla
    if (!isFullnameValid || !isEmailValid || !isRoleValid || !isPasswordValid || !isEnvValid || !isTermsValid) {
      return;
    }

    // Mensaje de éxito si todos los campos son correctos
    successBanner.textContent = `✓ Formulario enviado con éxito. Registro completado para ${fields.fullname.value.trim()}.`;
    successBanner.classList.add("active");

    // Limpiar el formulario
    form.reset();
  });
});
