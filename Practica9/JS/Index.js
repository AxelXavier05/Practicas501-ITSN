// JS/Index.js (versión sencilla con tus 3 requisitos)

document.addEventListener('DOMContentLoaded', () => {
  const estado = document.getElementById('estado');
  const fecha = document.getElementById('fecha');
  const btn = document.getElementById('btnRegistrar');
  const pass = document.getElementById('password');
  const pass2 = document.getElementById('confirmPassword');

  // 1) Dejar "Guanajuato" seleccionado por default
  if (estado) {
    // Busca la opción cuyo texto contenga "Guanajuato"
    const opts = Array.from(estado.options);
    const gx = opts.find(o => o.text.toLowerCase().includes('guanajuato'));
    if (gx) estado.value = gx.value;
  }

  // 2) Poner la fecha actual por defecto
  if (fecha) {
    // Forma simple y robusta para <input type="date">
    const hoy = new Date();
    const pad = n => String(n).padStart(2, '0');
    fecha.value = `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}`;
    // Alternativa: fecha.valueAsDate = new Date();  // (también sirve)
  }

  // 3) Validación de contraseña: iguales y mínimo 8 caracteres
  btn?.addEventListener('click', (e) => {
    e.preventDefault();
    limpiarMensajes();

    const p1 = pass.value.trim();
    const p2 = pass2.value.trim();
    const errores = [];

    if (p1.length < 8) {
      errores.push('La contraseña debe tener mínimo 8 caracteres.');
      marcarInvalido(pass);
    }

    if (p1 !== p2) {
      errores.push('Las contraseñas no coinciden.');
      marcarInvalido(pass);
      marcarInvalido(pass2);
    }

    if (errores.length) {
      mostrarMensaje(errores.join(' '), 'danger');
      return;
    }

    marcarValido(pass);
    marcarValido(pass2);
    mostrarMensaje('Registro válido. Puedes enviar el formulario.', 'success');
  });
});

// ===== utilidades visuales con Bootstrap =====
function mostrarMensaje(msg, tipo = 'primary') {
  let cont = document.getElementById('formAlert');
  if (!cont) {
    cont = document.createElement('div');
    cont.id = 'formAlert';
    document.querySelector('.container')?.appendChild(cont);
  }
  cont.className = `alert alert-${tipo} mt-3`;
  cont.textContent = msg;
}

function limpiarMensajes() {
  const cont = document.getElementById('formAlert');
  if (cont) cont.remove();
}

function marcarInvalido(el) {
  if (!el) return;
  el.classList.remove('is-valid');
  el.classList.add('is-invalid');
}

function marcarValido(el) {
  if (!el) return;
  el.classList.remove('is-invalid');
  el.classList.add('is-valid');
}
