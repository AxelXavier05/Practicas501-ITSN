const personajes = [
  {
    nombre: "Meredith",
    apellido: "Grey",
    edad: 38,
    profesion: "Cirujana general",
    direccion: { calle: "Seattle Grace Hospital", ciudad: "Seattle", estado: "WA" },
    hobbies: ["Operar", "Investigar", "Correr"],
    foto: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Greys-Anatomy-Season-7-Promo-9.jpg/250px-Greys-Anatomy-Season-7-Promo-9.jpg"
  },
  {
    nombre: "Derek",
    apellido: "Shepherd",
    edad: 40,
    profesion: "Neurocirujano",
    direccion: { calle: "Neuro Wing", ciudad: "Seattle", estado: "WA" },
    hobbies: ["Neurocirugía", "Pescar", "Docencia"],
    foto: "https://upload.wikimedia.org/wikipedia/en/b/b4/Dr._Derek_Shepherd.jpg"
  },
  {
    nombre: "Cristina",
    apellido: "Yang",
    edad: 37,
    profesion: "Cardiocirujana",
    direccion: { calle: "Cardio Wing", ciudad: "Seattle", estado: "WA" },
    hobbies: ["Cardio", "Investigación", "Café"],
    foto: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Cristina_Yang.jpg"
  },
  {
    nombre: "Miranda",
    apellido: "Bailey",
    edad: 42,
    profesion: "Cirujana general / Jefa",
    direccion: { calle: "Sala de cirugías", ciudad: "Seattle", estado: "WA" },
    hobbies: ["Docencia", "Gestión", "Lectura"],
    foto: "https://upload.wikimedia.org/wikipedia/en/8/87/Dr._Miranda_Bailey.jpg"
  },
  {
    nombre: "Alex",
    apellido: "Karev",
    edad: 35,
    profesion: "Cirujano pediatra",
    direccion: { calle: "Peds", ciudad: "Seattle", estado: "WA" },
    hobbies: ["Pediatría", "Gimnasio", "Series"],
    foto: "https://upload.wikimedia.org/wikipedia/en/f/f3/Dr._Alex_Karev.jpg"
  },
  {
    nombre: "Richard",
    apellido: "Webber",
    edad: 58,
    profesion: "Cirujano / Ex Jefe",
    direccion: { calle: "Dirección médica", ciudad: "Seattle", estado: "WA" },
    hobbies: ["Mentoría", "Cocinar", "Caminar"],
    foto: "https://upload.wikimedia.org/wikipedia/en/3/34/Dr._Richard_Webber.jpg"
  }
];

const columna = document.querySelector(".container .row:nth-of-type(2) .col-12");

columna.innerHTML = `
  <div class="row g-4">
    ${personajes.map(p => `
      <div class="col-sm-6 col-md-4">
        <div class="card shadow h-100">
          <img
            src="${p.foto || ''}"
            alt="${p.nombre} ${p.apellido}"
            class="d-block mx-auto my-3"
            style="
              width:170px;
              height:210px;
              object-fit:cover;
              object-position:50% 12%;
              border-radius:12px;
            "
          >
          <div class="card-body">
            <h5 class="card-title">${p.nombre} ${p.apellido}</h5>
            <p>Edad: ${p.edad} años</p>
            <p>Profesión: ${p.profesion}</p>
            <p>Dirección: ${p.direccion.calle}, ${p.direccion.ciudad}, ${p.direccion.estado}</p>
            <p>Hobbies:</p>
            <ul>
              ${p.hobbies.map(h => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
`;
