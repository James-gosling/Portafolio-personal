/**
 * STARK INDUSTRIES // SUITE JQUERY DE TELEMETRÍA Y CONTROL DOM
 * Demostración de selectores, efectos, manipulación del DOM y eventos.
 */

$(document).ready(function () {

  // =========================================================================
  // 1. SELECTORES DE JQUERY
  // =========================================================================

  // Selector por ID: Ajusta el espaciado del encabezado principal
  $("#lab-title").css("letter-spacing", "0.08em");

  // Selector por Etiqueta: Normaliza la tipografía de todos los párrafos
  $("p").css("font-family", "system-ui, sans-serif");

  // Selector por Clase: Asigna transiciones suaves a todas las tarjetas tácticas
  $(".suit-card").css("transition", "all 0.3s ease");


  // =========================================================================
  // 2. EFECTOS DE JQUERY (slideToggle, slideUp, slideDown, fadeOut, fadeIn)
  // =========================================================================

  // Efecto 1 & 2: slideToggle() para ocultar o mostrar el contenedor del hangar
  $("#btn-toggle-suits").on("click", function () {
    $("#hangar-bay").slideToggle(500);
    $("#log-output").text("[SISTEMA] Ejecutado efecto slideToggle() sobre el hangar.");
  });

  // Efecto 3 & 4: fadeOut() y fadeIn() encadenados para reiniciar la vista de telemetría
  $("#btn-fade-reset").on("click", function () {
    $(".suit-card").fadeOut(350, function () {
      // Limpia clases añadidas durante el ciclo
      $(this).removeClass("highlight-border selected-suit");
      // Restaura la visibilidad con fadeIn
      $(this).fadeIn(350);     });$("#log-output").text("[SISTEMA] Ejecutados efectos fadeOut() y fadeIn() sobre las tarjetas.");
  });


  // =========================================================================
  // 3. MANIPULACIÓN DEL DOM (.first(), .last(), .eq(), .parent(), .siblings())
  // =========================================================================

  $("#btn-highlight-dom").on("click", function () {
    // Limpieza de estados anteriores
    $(".suit-card").removeClass("highlight-border selected-suit");

    // Método 1: .first() para capturar la primera tarjeta del hangar
    $(".suit-card").first().addClass("highlight-border");

    // Método 2: .last() para capturar la última tarjeta del hangar
    $(".suit-card").last().addClass("highlight-border");

    // Método 3: .eq(2) para capturar el elemento en el índice 2 (tercera tarjeta)
    const targetMiddle = $(".suit-card").eq(2);
    targetMiddle.addClass("selected-suit");

    // Método adicional: .parent() para inspeccionar el contenedor inmediato
    const parentId = targetMiddle.parent().attr("id");

    $("#log-output").text(
      `[DOM] Métodos first() y last() marcados con dorado. eq(2) seleccionado dentro de parent: #${parentId}`
    );
  });


  // =========================================================================
  // 4. EVENTOS DE JQUERY (click, mouseenter, mouseleave, keyup, change)
  // =========================================================================

  // Evento 1: click en tarjeta individual con .siblings() para deseleccionar a las hermanas
  $(".suit-card").on("click", function () {
    $(this).addClass("selected-suit");
    $(this).siblings().removeClass("selected-suit");

    const suitName = $(this).find(".card-title").text();
    $("#log-output").text(`[EVENTO CLICK] Armadura seleccionada: ${suitName}`);
  });

  // Evento 2: mouseenter y mouseleave (Hover sobre los párrafos descriptivos)
  $(".terminal-text").on("mouseenter", function () {
    $(this).css("color", "#00d2ff");
  }).on("mouseleave", function () {
    $(this).css("color", "#94a3b8");
  });

  // Evento 3: keyup en el campo de texto del formulario de operador
  $("#operator-input").on("keyup", function () {
    const inputVal = $(this).val();
    if (inputVal.trim() !== "") {
      $("#log-output").text(`[EVENTO KEYUP] Transmitiendo indicativo: ${inputVal}`);
    } else {
      $("#log-output").text("[SISTEMA] En espera de interacción del operador...");
    }
  });

  // Evento 4: change en el selector de nivel de credencial
  $("#clearance-select").on("change", function () {
    const selectedClearance = $(this).val().toUpperCase();$("#log-output").text(`[EVENTO CHANGE] Nivel de credencial actualizado a: ${selectedClearance}`);
  });

});
