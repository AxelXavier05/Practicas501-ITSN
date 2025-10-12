const listaEmpleados = document.getElementById("listaEmpleados");
const buscador = document.getElementById("buscador");

let playlist = [
  {
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bbX8HEqKSIMwZYoWQi7ZjEM3p3v9rWC2Cg&s",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    spotifyId: "0VjIjW4GlUZAMYd2vXMi3b",
    spotifyUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b"
  },
  {
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRymPrrFK-MAS0-PZU98HRYUqqvyvqVKfkAQ&s",
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    spotifyId: "7qiZfU4dY1lWllzX7mPBI3",
    spotifyUrl: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3"
  },
  {
    cover: "https://revistamundodiners.com/wp-content/uploads/2023/12/word-image-23-854x1024.jpg",
    title: "bad guy",
    artist: "Billie Eilish",
    album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
    spotifyId: "2Fxmhks0bxGSBdJ92vM42m",
    spotifyUrl: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m"
  },
  {
    cover: "https://people.com/thmb/ZMjyPyKqR0ClfRrfBDnCl5hFizk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(399x0:401x2)/bruno-mars-800-7c8ab361670646f78af6f0d1f432ef2d.jpg",
    title: "Uptown Funk",
    artist: "Mark Ronson, Bruno Mars",
    album: "Uptown Special",
    spotifyId: "32OlwWuMpZ6b0aN2RZOeMS",
    spotifyUrl: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS"
  },
  {
    cover: "https://static01.nyt.com/images/2021/07/26/arts/23playlist/23playlist-superJumbo-v2.jpg",
    title: "INDUSTRY BABY",
    artist: "Lil Nas X, Jack Harlow",
    album: "MONTERO",
    spotifyId: "27NovPIUIRrOZoCHxABJwK",
    spotifyUrl: "https://open.spotify.com/track/27NovPIUIRrOZoCHxABJwK"
  },
  {
    cover: "https://media.vogue.mx/photos/6810e2e581320a1393e0481d/2:3/w_2560%2Cc_limit/dua-lipa-con-vestido-tejido.jpg",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    spotifyId: "463CkQjx2Zk1yXoBuierM9",
    spotifyUrl: "https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9"
  }
];

const FAV_KEY = "playlist_favoritos";
const getFavs = () => JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
const setFavs = (arr) => localStorage.setItem(FAV_KEY, JSON.stringify(arr));
const isFav = (id) => getFavs().includes(id);
const toggleFav = (id) => {
  const favs = getFavs();
  const idx = favs.indexOf(id);
  if (idx >= 0) favs.splice(idx, 1); else favs.push(id);
  setFavs(favs);
};

function render(list){
  listaEmpleados.innerHTML = "";
  list.forEach((track, i) => {
    const fav = isFav(track.spotifyId);
    listaEmpleados.innerHTML += `
      <div class="col-12">
        <div class="card-track d-flex align-items-center">
          <div class="d-none d-md-block col-md-1 text-secondary fw-bold">${i+1}</div>

          <div class="col-2 col-md-1">
            <img src="${track.cover}" alt="Cover" class="cover">
          </div>

          <div class="col-10 col-md-4 px-2">
            <a class="track-title" href="#" data-id="${track.spotifyId}" data-url="${track.spotifyUrl}">
              ${track.title}
            </a>
            <div class="track-meta">
              <p class="track-artist mb-0">${track.artist}</p>
            </div>
          </div>

          <div class="d-none d-md-block col-md-3">
            <p class="track-album mb-0">${track.album}</p>
          </div>

          <div class="col-12 col-md-3 d-flex gap-2 justify-content-md-end mt-2 mt-md-0">
            <span class="badge-fav ${fav ? 'opacity-100' : 'opacity-75'}">
              ${fav ? "★ Favorito" : "☆ Favorito"}
            </span>
            <button class="btn btn-outline-secondary btn-sm btn-icon" data-action="fav" data-id="${track.spotifyId}">
              ${fav ? "Quitar" : "Añadir"}
            </button>
            <button class="btn btn-outline-danger btn-sm btn-icon" data-action="del" data-id="${track.spotifyId}">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function openInSpotify(spotifyId, webUrl){
  const appLink = `spotify:track:${spotifyId}`;
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = appLink;
  document.body.appendChild(iframe);
  setTimeout(() => {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    document.body.removeChild(iframe);
  }, 800);
}

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
      render(playlist);
      return;
    }
    if (action === "del"){
      if (confirm("¿Seguro que deseas eliminar esta canción de la lista?")){
        playlist = playlist.filter(t => t.spotifyId !== id);
        if (isFav(id)) toggleFav(id);
        render(playlist);
      }
    }
  }
});

buscador.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtrada = playlist.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.artist.toLowerCase().includes(q) ||
    t.album.toLowerCase().includes(q)
  );
  render(filtrada);
});

render(playlist);
