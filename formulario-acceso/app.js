/**
 * STARK INDUSTRIES // PROTOCOLO DE AUTORIZACIÓN J.A.R.V.I.S.
 * Validación de campos, expresiones regulares y bloqueo de envío preventivo.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("starkForm");
  const statusReport = document.getElementById("statusReport");

  // Mapeo de elementos
  const fields = {
    fullname: document.getElementById("fullname"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    division: document.getElementById("division"),
    password: document.getElementById("password"),
    nda: document.getElementById("nda"),
    facility: () => document.querySelector('input[name="facility"]:checked')
  };

  // Asignar error visual en el HUD
  const triggerError = (id, message) => {
    const group = document.getElementById(`group-${id}`);
    const errorSpan = document.getElementById(`error-${id}`);
    if (group) group.classList.add("error-state");
    if (errorSpan) errorSpan.textContent = `[!] ERROR // ${message}`;
  };

  // Restablecer estado normal
  const clearErrorState = (id) => {
    const group = document.getElementById(`group-${id}`);
    const errorSpan = document.getElementById(`error-${id}`);
    if (group) group.classList.remove("error-state");
    if (errorSpan) errorSpan.textContent = "";
  };

  // Validador Regex de correo
  const isEmailStructureValid = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  };

  // 1. Identificador de Agente
  const checkFullname = () => {
    const val = fields.fullname.value.trim();
    if (val === "") {
      triggerError("fullname", "Identificador de operador requerido.");
      return false;
    }
    if (val.length < 3) {
      triggerError("fullname", "Mínimo 3 caracteres para registro táctico.");
      return false;
    }
    clearErrorState("fullname");
    return true;
  };

  // 2. Comunicaciones Seguras
  const checkEmail = () => {
    const val = fields.email.value.trim();
    if (val === "") {
      triggerError("email", "Canal de enlace obligatorio.");
      return false;
    }
    if (!isEmailStructureValid(val)) {
      triggerError("email", "Formato de cifrado inválido (usuario@dominio.com).");
      return false;
    }
    clearErrorState("email");
    return true;
  };

  // 3. División Técnica
  const checkDivision = () => {
    if (fields.division.value === "") {
      triggerError("division", "Seleccione una división autorizada.");
      return false;
    }
    clearErrorState("division");
    return true;
  };

  // 4. Llave Biometría / Password
  const checkPassword = () => {
    const val = fields.password.value;
    if (val === "") {
      triggerError("password", "Llave criptográfica requerida.");
      return false;
    }
    if (val.length < 8) {
      triggerError("password", `Cifrado débil: ${val.length}/8 caracteres mínimos.`);
      return false;
    }
    clearErrorState("password");
    return true;
  };

  // 5. Complejo Operativo (Radio)
  const checkFacility = () => {
    if (!fields.facility()) {
      triggerError("facility", "Asignación de base obligatoria.");
      return false;
    }
    clearErrorState("facility");
    return true;
  };

  // 6. Acuerdo NDA (Checkbox)
  const checkNDA = () => {
    if (!fields.nda.checked) {
      triggerError("nda", "Aceptación de directiva de seguridad Stark requerida.");
      return false;
    }
    clearErrorState("nda");
    return true;
  };

  // Monitoreo en tiempo real
  fields.fullname.addEventListener("blur", checkFullname);
  fields.email.addEventListener("blur", checkEmail);
  fields.division.addEventListener("change", checkDivision);
  fields.password.addEventListener("input", () => {
    if (fields.password.value.length >= 8) clearErrorState("password");
  });
  fields.nda.addEventListener("change", checkNDA);
  document.querySelectorAll('input[name="facility"]').forEach((r) => {
    r.addEventListener("change", checkFacility);
  });

  // Ejecución y verificación al enviar
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusReport.classList.remove("active");

    const validName = checkFullname();
    const validEmail = checkEmail();
    const validDiv = checkDivision();
    const validPass = checkPassword();
    const validFac = checkFacility();
    const validNDA = checkNDA();

    if (!validName || !validEmail || !validDiv || !validPass || !validFac || !validNDA) {
      return;
    }

    // Éxito confirmado por J.A.R.V.I.S.
    const selectedFacility = fields.facility().value.toUpperCase();
    statusReport.innerHTML = `
      <strong>[✓] ACCESO NIVEL 7 AUTORIZADO POR J.A.R.V.I.S.</strong><br>
      Bienvenido a bordo, Agente ${fields.fullname.value.trim()}. Credenciales activadas en ${selectedFacility}.
    `;
    statusReport.classList.add("active");

    form.reset();
  });
});
