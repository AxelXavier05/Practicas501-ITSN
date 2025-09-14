// Calculadora básica estilo keypad
(() => {
  const form = document.getElementById("calcForm");
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button[data-value]");
  const clearBtn = document.getElementById("clear");

  // Agregar valor al display
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      display.value += btn.dataset.value;
    });
  });

  // Evaluar expresión al dar "=" (submit del form)
  form.addEventListener("submit", e => {
    e.preventDefault();
    try {
      display.value = eval(display.value); // evaluamos expresión
    } catch {
      display.value = "Error";
    }
  });

  // Limpiar pantalla
  clearBtn.addEventListener("click", () => {
    display.value = "";
  });
})();
