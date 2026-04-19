/* const wrapperElm = document.querySelector("#wrapper")
let search = window.location.search
let params = new URLSearchParams(search) 
let movie_id = params.get("movie_id")

console.log(movie_id)
function findRating(release_dates_array) {
    let us_dates= release_dates_array.results.find(element => element.iso_3166_1 == "US")
    let rated = us_dates.release_dates.find(element => element.certification != "")
    return rated.certification
}

fetch(`https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=credits,videos,release_dates`,  {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
})

.then(response => response.json())
.then(data => {
    console.log(data)
    let detailCard = `
    <article>
    <h1>Her kommer data om filmen </h1>
    <p>Length</p>
    
    <p>${Math.floor(data.runtime/60)}h ${data.runtime%60}</p>
    <p>Rating:</p>
    <p>${findRating(data.release_dates)}</p>
    </article>
    `
    wrapperElm.insertAdjacentHTML("beforeend",detailCard)
    }) */
const wrapperElm = document.querySelector("#wrapper");
let search = window.location.search;
let params = new URLSearchParams(search);
let movie_id = params.get("movie_id");

console.log(movie_id);

function findRating(release_dates_array) {
  let us_dates = release_dates_array.results.find(
    (element) => element.iso_3166_1 == "US"
  );
  if (!us_dates) return "NR"; // Not Rated
  let rated = us_dates.release_dates.find(
    (element) => element.certification != ""
  );
  return rated ? rated.certification : "NR";
}

fetch(
  `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=credits,videos,release_dates`,
  {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const baseImgUrl = "https://image.tmdb.org/t/p/w500/";
    const backdropUrl = "https://image.tmdb.org/t/p/w780/";

    // Trailer (first YouTube video if available)
    const trailer = data.videos.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    const trailerLink = trailer
      ? `https://www.youtube.com/watch?v=${trailer.key}`
      : "#";

    // Genres
    const genrePills = data.genres
      .map((g) => `<span class="genre-pill">${g.name}</span>`)
      .join(" ");

    // Top 4 cast
    const castHTML = data.credits.cast
      .slice(0, 4)
      .map(
        (cast) => `
      <div class="cast-card">
        <img src="${
          cast.profile_path
            ? baseImgUrl + cast.profile_path
            : "https://via.placeholder.com/100"
        }" alt="${cast.name}">
        <p>${cast.name}</p>
      </div>
    `
      )
      .join("");

    let detailCard = `
    <section class="movie-detail">
      <div class="backdrop">
        <img src="${backdropUrl + data.backdrop_path}" alt="${data.title}">
        <a class="play-btn" href="${trailerLink}" target="_blank">▶</a>
        <a class="play-text" href="${trailerLink}" target="_blank">Play Trailer</a>
      </div>
      <div class="movie-info">
        <h1>${data.title}</h1>
        <p>⭐ ${data.vote_average.toFixed(1)} / 10 IMDb</p>
        <div class="genres">${genrePills}</div>
        <ul class ="movieInfo"><li>Length:<br> <strong>${Math.floor(
          data.runtime / 60
        )}h ${data.runtime % 60}m</strong></li>
        <li>Language:<br> <strong>${data.original_language.toUpperCase()}</strong></li>
        <li>Rating:<br> <strong>${findRating(data.release_dates)}</strong></li>
        </ul>
      </div>
      <div class="description">
        <h2>Description</h2>
        <p>${data.overview}</p>
      </div>
      <div class="cast">
        <h2>Cast</h2>
        <div class="cast-grid">${castHTML}</div>
      </div>
    </section>
    `;

    wrapperElm.insertAdjacentHTML("beforeend", detailCard);
  });
