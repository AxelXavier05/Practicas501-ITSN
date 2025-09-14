'use strict';

/*
  app.js — lógica separada
  - Muestra nombre completo
  - Ejemplos simples (suma, switch, etc.)
  - Calcula área de círculo con validación
*/

// ====== Demostración de variables simples ======
const nombre = 'Xavier';
const apellido = 'Morales';

// Muestra "Xavier Morales" en el <p id="nombreCompleto">
const nombreCompletoEl = document.getElementById('nombreCompleto');
nombreCompletoEl.textContent = `${nombre} ${apellido}`;

// Constante PI (mejor usar Math.PI que 3.1416)
const PI = Math.PI;

// Operaciones con edad (solo como ejemplo)
let edad = 20;
console.log(edad * 2, edad / 2, edad + 2, edad - 2);

// Mayor de edad (ejemplo if/else)
const edadXavier = 20;
console.log(edadXavier >= 18 ? 'Xavier es mayor de edad' : 'Xavier es menor de edad');

// Switch (ejemplo)
const diaSemana = 'Sabado';
switch (diaSemana) {
  case 'Lunes':      console.log('Hoy es Lunes'); break;
  case 'Martes':     console.log('Hoy es Martes'); break;
  case 'Miercoles':  console.log('Hoy es Miércoles'); break;
  case 'Jueves':     console.log('Hoy es Jueves'); break;
  case 'Viernes':    console.log('Hoy es Viernes'); break;
  case 'Sabado':     console.log('Hoy es Sábado'); break;
  case 'Domingo':    console.log('Hoy es Domingo'); break;
  default:           console.log('No es un día de la semana');
}

// Funciones de ejemplo
function sumar(a, b) {
  return a + b;
}
console.log('La suma es:', sumar(8, 12));

// ====== Cálculo del área de un círculo ======
function areaCirculo(r) {
  return PI * r * r;
}

// ====== DOM y validación del formulario ======
const form = document.getElementById('formArea');
const inputRadio = document.getElementById('valorRadio');
const inputResultado = document.getElementById('resultado');
const msg = document.getElementById('msg');

// Valida mientras el usuario escribe (opcional, simple)
inputRadio.addEventListener('input', () => {
  const r = parseFloat(inputRadio.value);
  if (Number.isNaN(r) || r <= 0) {
    inputRadio.classList.add('is-invalid');
    msg.classList.add('error');
    msg.textContent = 'El radio debe ser un número mayor que 0.';
    inputResultado.value = '';
  } else {
    inputRadio.classList.remove('is-invalid');
    msg.classList.remove('error');
    msg.textContent = 'Listo: da clic en "Calcular área".';
  }
});

// Manejo del submit
form.addEventListener('submit', (event) => {
  event.preventDefault(); // evita recargar la página

  const r = parseFloat(inputRadio.value);
  if (Number.isNaN(r) || r <= 0) {
    inputRadio.classList.add('is-invalid');
    msg.classList.add('error');
    msg.textContent = 'El radio debe ser un número mayor que 0.';
    inputResultado.value = '';
    return;
  }

  const area = areaCirculo(r);
  inputResultado.value = area.toFixed(2); // 2 decimales
  msg.classList.remove('error');
  msg.textContent = `Cálculo realizado con PI = ${PI.toFixed(5)}.`;
});
