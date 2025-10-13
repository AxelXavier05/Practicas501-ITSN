const listaEmpleados = document.getElementById("listaEmpleados");
const buscador = document.getElementById("buscador");
const btnTodas = document.getElementById("btnTodas");
const btnFavs  = document.getElementById("btnFavs");

const toastEl = document.getElementById("toastFav");
const toastMsg = document.getElementById("toastMessage");
const toast = new bootstrap.Toast(toastEl, { delay: 1400 });

/* ---------- PLAYLIST (foto = cantante) ---------- */
/* Si alguna imagen falla, ponemos un placeholder SVG oscuro */
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
  <rect width='100%' height='100%' fill='#0f141b'/>
  <circle cx='32' cy='24' r='14' fill='#1f2a37'/>
  <rect x='14' y='44' width='36' height='14' rx='7' fill='#1f2a37'/>
</svg>`);

let playlist = [
  { cover:"https://i.scdn.co/image/ab6761610000e5eb9e528993a2820267b97f6aae",
    title:"Blinding Lights", artist:"The Weeknd", album:"After Hours",
    spotifyId:"0VjIjW4GlUZAMYd2vXMi3b", spotifyUrl:"https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b" },
  { cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZA64p-1sc81aHjNALrI0jny0qEvUCbNrWkw&s",
    title:"Shape of You", artist:"Ed Sheeran", album:"÷ (Divide)",
    spotifyId:"7qiZfU4dY1lWllzX7mPBI3", spotifyUrl:"https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3" },
  { cover:"https://media.vogue.es/photos/609d3714fae5608e730970ed/4:3/w_1999,h_1499,c_limit/Billie-Eilish-Happier-Than-Ever.jpeg",
    title:"bad guy", artist:"Billie Eilish", album:"WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
    spotifyId:"2Fxmhks0bxGSBdJ92vM42m", spotifyUrl:"https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m" },
  { cover:"https://i0.wp.com/plus.cusica.com/wp-content/uploads/2016/10/bruno-mars-cusica-plus-5.jpg?fit=3000%2C2211&ssl=1",
    title:"Uptown Funk", artist:"Mark Ronson, Bruno Mars", album:"Uptown Special",
    spotifyId:"32OlwWuMpZ6b0aN2RZOeMS", spotifyUrl:"https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS" },
  { cover:"https://upload.wikimedia.org/wikipedia/commons/c/ce/Mark_Ronson_and_Jennifer_Su%2C_2011_%28cropped%29.jpg",
    title:"INDUSTRY BABY", artist:"Lil Nas X, Jack Harlow", album:"MONTERO",
    spotifyId:"27NovPIUIRrOZoCHxABJwK", spotifyUrl:"https://open.spotify.com/track/27NovPIUIRrOZoCHxABJwK" },
  { cover:"https://m.media-amazon.com/images/M/MV5BYmRjM2RlZjItMDZhNS00MTM2LThiZDUtZDQxMmVjYjQ2ZmM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    title:"Levitating", artist:"Dua Lipa", album:"Future Nostalgia",
    spotifyId:"463CkQjx2Zk1yXoBuierM9", spotifyUrl:"https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9" },
  { cover:"https://static.wikia.nocookie.net/universo-reynandez/images/c/c0/Taylor_Swift.jpg/revision/latest?cb=20221226092146&path-prefix=es",
    title:"Anti-Hero", artist:"Taylor Swift", album:"Midnights",
    spotifyId:"0V3wPSX9ygBnCm8psDIegu", spotifyUrl:"https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu" },
  { cover:"https://i.scdn.co/image/ab6761610000e5eb81f47f44084e0a09b5f0fa13",
    title:"Tití Me Preguntó", artist:"Bad Bunny", album:"Un Verano Sin Ti",
    spotifyId:"1ri9ZUkBJVFUdgwzCnfcYs", spotifyUrl:"https://open.spotify.com/track/1ri9ZUkBJVFUdgwzCnfcYs" },
  { cover:"https://cdn-images.dzcdn.net/images/artist/dd8c6b3068d2761955eb6e432046ed91/1900x1900-000000-81-0-0.jpg",
    title:"PROVENZA", artist:"KAROL G", album:"PROVENZA (single)",
    spotifyId:"4k0XscU1tI9KXqTH3ZqiiA", spotifyUrl:"https://open.spotify.com/track/4k0XscU1tI9KXqTH3ZqiiA" },
  { cover:"https://www.billboard.com/wp-content/uploads/2023/05/eslabon-armado-peso-pluma-press-del-studios-2023-billboard-espanol-2-1548.jpg?w=942&h=628&crop=1",
    title:"Ella Baila Sola", artist:"Eslabón Armado, Peso Pluma", album:"DESVELADO",
    spotifyId:"1IHWl5LamUGEuP4ozKQSXZ", spotifyUrl:"https://open.spotify.com/track/1IHWl5LamUGEuP4ozKQSXZ" },
  { cover:"https://hips.hearstapps.com/hmg-prod/images/singer-rosalia-attends-the-red-carpet-for-the-los40-music-news-photo-1667993125.jpg?crop=0.66675xw:1xh;center,top&resize=640:*",
    title:"DESPECHÁ", artist:"ROSALÍA", album:"MOTOMAMI +",
    spotifyId:"0WtM2NBVQNNJLh6scP13H8", spotifyUrl:"https://open.spotify.com/track/0WtM2NBVQNNJLh6scP13H8" },
  { cover:"https://cdn-images.dzcdn.net/images/cover/e68da86fd7976135c2d2d1715afaef7c/0x1900-000000-80-0-0.jpg",
    title:"drivers license", artist:"Olivia Rodrigo", album:"SOUR",
    spotifyId:"5wANPM4fQCJwkGd4rN57mH", spotifyUrl:"https://open.spotify.com/track/5wANPM4fQCJwkGd4rN57mH" },
  { cover:"https://hips.hearstapps.com/hmg-prod/images/kendrick-lamar-at-the-67th-grammy-awards-held-at-the-crypto-news-photo-1738959019.pjpeg?crop=1.00xw:0.667xh;0,0.0715xh&resize=640:*",
    title:"HUMBLE.", artist:"Kendrick Lamar", album:"DAMN.",
    spotifyId:"7KXjTSCq5nL1LoYtL7XAwS", spotifyUrl:"https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS" },
  { cover:"https://static.wikia.nocookie.net/rappers/images/c/c0/2406.webp/revision/latest?cb=20230920201112",
    title:"SICKO MODE", artist:"Travis Scott", album:"ASTROWORLD",
    spotifyId:"2xLMifQCjDGFmkHkpNLD9h", spotifyUrl:"https://open.spotify.com/track/2xLMifQCjDGFmkHkpNLD9h" },
  { cover:"https://prowly-prod.s3.eu-west-1.amazonaws.com/uploads/landing_page/template_background/177928/1a91e5c2bd2e27802833b34e6dd9a9ab.jpg",
    title:"Viva La Vida", artist:"Coldplay", album:"Viva la Vida or Death and All His Friends",
    spotifyId:"1mea3bSkSGXuIRvnydlB5b", spotifyUrl:"https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b" },
  { cover:"https://i.scdn.co/image/ab6761610000e5ebab47d8dae2b24f5afe7f9d38",
    title:"Believer", artist:"Imagine Dragons", album:"Evolve",
    spotifyId:"0pqnGHJpmpxLKifKRmU6WP", spotifyUrl:"https://open.spotify.com/track/0pqnGHJpmpxLKifKRmU6WP" },
];

/* ---------- FAVORITOS ---------- */
const FAV_KEY = "playlist_favoritos";
const getFavs = () => JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
const setFavs = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));
const isFav = (id) => getFavs().includes(id);
const toggleFav = (id) => {
  const favs = getFavs();
  const idx = favs.indexOf(id);
  let added;
  if (idx >= 0){ favs.splice(idx, 1); added = false; }
  else { favs.push(id); added = true; }
  setFavs(favs);
  showToast(added ? "Añadido a Tus me gusta" : "Quitado de Tus me gusta");
};

function showToast(text){
  toastMsg.textContent = text;
  toast.show();
}

/* ---------- VISTA / RENDER ---------- */
let vista = "all"; // "all" | "favs"

function getListToRender(){
  if (vista === "favs"){
    const favs = new Set(getFavs());
    return playlist.filter(t => favs.has(t.spotifyId));
  }
  return playlist;
}

function imgTag(track){
  // referrerpolicy y onerror → placeholder seguro
  return `<img src="${track.cover}" alt="${track.artist}" class="cover" referrerpolicy="no-referrer"
           onerror="this.onerror=null;this.src='${PLACEHOLDER}'">`;
}

function render(){
  const list = getListToRender();
  listaEmpleados.innerHTML = "";
  list.forEach((track, i) => {
    const fav = isFav(track.spotifyId);
    listaEmpleados.innerHTML += `
      <div class="col-12">
        <div class="card-track d-flex align-items-center">
          <div class="d-none d-md-block col-md-1 text-muted-2 fw-bold">${i+1}</div>

          <div class="col-2 col-md-1">${imgTag(track)}</div>

          <div class="col-10 col-md-4 px-2">
            <a class="track-title" href="#" data-id="${track.spotifyId}" data-url="${track.spotifyUrl}">
              ${track.title}
            </a>
            <div class="track-meta">
              <p class="track-artist mb-0"><i class="bi bi-person-lines-fill me-1"></i>${track.artist}</p>
            </div>
          </div>

          <div class="d-none d-md-block col-md-3">
            <p class="track-album mb-0">${track.album}</p>
          </div>

          <div class="col-12 col-md-3 d-flex gap-2 justify-content-md-end mt-2 mt-md-0">
            <span class="badge-fav ${fav ? 'opacity-100' : 'opacity-75'}">
              <i class="bi ${fav ? 'bi-star-fill' : 'bi-star'}"></i>${fav ? "Favorito" : "Favorito"}
            </span>
            <button class="btn btn-outline-light btn-sm" data-action="fav" data-id="${track.spotifyId}">
              <i class="bi ${fav ? 'bi-star-fill' : 'bi-star'} me-1"></i>${fav ? "Quitar" : "Añadir"}
            </button>
            <button class="btn btn-outline-light btn-sm" data-action="del" data-id="${track.spotifyId}">
              <i class="bi bi-trash me-1"></i>Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
  });

  if (list.length === 0){
    listaEmpleados.innerHTML = `
      <div class="col-12">
        <div class="p-5 text-center text-muted-2">
          <i class="bi bi-star fs-1 d-block mb-2"></i>
          <p class="mb-1">Aún no tienes canciones en <b>Tus me gusta</b>.</p>
          <small>Agrega con el botón <i class="bi bi-star"></i> en cualquier canción.</small>
        </div>
      </div>`;
  }
}

/* ---------- Abrir en Spotify (app si está) ---------- */
function openInSpotify(spotifyId, webUrl){
  const appLink = `spotify:track:${spotifyId}`;
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = appLink;
  document.body.appendChild(iframe);
  setTimeout(() => {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    document.body.removeChild(iframe);
  }, 700);
}

/* ---------- Events ---------- */
listaEmpleados.addEventListener("click", (e) => {
  const link = e.target.closest(".track-title");
  const btn = e.target.closest("button");
  if (link){
    e.preventDefault();
    const id = link.getAttribute("data-id");
    const url = link.getAttribute("data-url");
    openInSpotify(id, url);
    return;
  }
  if (btn){
    const action = btn.getAttribute("data-action");
    const id = btn.getAttribute("data-id");
    if (action === "fav"){
      toggleFav(id);
      render();
      return;
    }
    if (action === "del"){
      if (confirm("¿Seguro que deseas eliminar esta canción de la lista?")){
        playlist = playlist.filter(t => t.spotifyId !== id);
        if (isFav(id)) toggleFav(id);
        render();
      }
    }
  }
});

buscador.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  const base = getListToRender();
  const filtrada = base.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.artist.toLowerCase().includes(q) ||
    t.album.toLowerCase().includes(q)
  );

  listaEmpleados.innerHTML = "";
  filtrada.forEach((track, i) => {
    const fav = isFav(track.spotifyId);
    listaEmpleados.innerHTML += `
      <div class="col-12">
        <div class="card-track d-flex align-items-center">
          <div class="d-none d-md-block col-md-1 text-muted-2 fw-bold">${i+1}</div>
          <div class="col-2 col-md-1">${imgTag(track)}</div>
          <div class="col-10 col-md-4 px-2">
            <a class="track-title" href="#" data-id="${track.spotifyId}" data-url="${track.spotifyUrl}">${track.title}</a>
            <div class="track-meta"><p class="track-artist mb-0"><i class="bi bi-person-lines-fill me-1"></i>${track.artist}</p></div>
          </div>
          <div class="d-none d-md-block col-md-3"><p class="track-album mb-0">${track.album}</p></div>
          <div class="col-12 col-md-3 d-flex gap-2 justify-content-md-end mt-2 mt-md-0">
            <span class="badge-fav ${fav ? 'opacity-100' : 'opacity-75'}"><i class="bi ${fav ? 'bi-star-fill' : 'bi-star'}"></i> Favorito</span>
            <button class="btn btn-outline-light btn-sm" data-action="fav" data-id="${track.spotifyId}">
              <i class="bi ${fav ? 'bi-star-fill' : 'bi-star'} me-1"></i>${fav ? "Quitar" : "Añadir"}
            </button>
            <button class="btn btn-outline-light btn-sm" data-action="del" data-id="${track.spotifyId}">
              <i class="bi bi-trash me-1"></i>Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
  });

  if (filtrada.length === 0){
    listaEmpleados.innerHTML = `<div class="col-12"><div class="p-5 text-center text-muted-2">Sin resultados.</div></div>`;
  }
});

btnTodas.addEventListener("click", () => {
  vista = "all";
  btnTodas.classList.add("active");
  btnFavs.classList.remove("active");
  render();
});

btnFavs.addEventListener("click", () => {
  vista = "favs";
  btnFavs.classList.add("active");
  btnTodas.classList.remove("active");
  render();
});

/* ---------- INIT ---------- */
render();
