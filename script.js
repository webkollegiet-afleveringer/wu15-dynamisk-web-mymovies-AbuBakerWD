/* 
  const wrapperElm = document.querySelector("#wrapper")

const baseImgUrl = "https://image.tmdb.org/t/p/w500/"

const fetchOptions = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  }
}

const nowPlayingFetch = fetch("https://api.themoviedb.org/3/movie/now_playing", fetchOptions).then(response => response.json())

const genreFetch = fetch(" https://api.themoviedb.org/3/genre/movie/list", fetchOptions).then(reponse => reponse.json())

Promise.all([nowPlayingFetch, genreFetch])
.then(([nowPlayingData, genreData]) => {
  const movies = nowPlayingData.results
  const genres = genreData.genres
  
  console.log(movies)

  let moviecards = movies.map(movie => `
      <article class = "movie">
      <img src="${baseImgUrl+movie.poster_path}" alt="" />
      <a class="movie__link" href="detail.html?movie_id=${movie.id}" aria-label="${movie.title}"></a>
      <h2 class="movie__title">${movie.title}</h2>
      <p>⭐${movie.vote_average.toFixed(1)} / 10 IMDb</p>
      
      <ul>${movie.genre_ids.map(id => `<li class="genre-pill"> ${genres.find(genre => genre.id == id).name} </li>`).join(" ")}</ul>
      </article>  
      `).join("")
  
      wrapperElm.insertAdjacentHTML("beforeend", moviecards);
} 
) */
const wrapperElm = document.querySelector("#wrapper");
const popularElm = document.querySelector("#popular-wrapper");

const baseImgUrl = "https://image.tmdb.org/t/p/w500/";

const fetchOptions = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`, // token comes from secretstuff.js
  },
};

// Fetch requests
const nowPlayingFetch = fetch(
  "https://api.themoviedb.org/3/movie/now_playing",
  fetchOptions
).then((res) => res.json());

const popularFetch = fetch(
  "https://api.themoviedb.org/3/movie/popular",
  fetchOptions
).then((res) => res.json());

const genreFetch = fetch(
  "https://api.themoviedb.org/3/genre/movie/list",
  fetchOptions
).then((res) => res.json());

// Run all fetches together
Promise.all([nowPlayingFetch, popularFetch, genreFetch]).then(
  ([nowPlayingData, popularData, genreData]) => {
    const nowPlayingMovies = nowPlayingData.results;
    const popularMovies = popularData.results;
    const genres = genreData.genres;

    // Render Now Playing (horizontal scroll)
    let nowPlayingCards = nowPlayingMovies
      .map(
        (movie) => `
        <article class="movie">
          <a href="detail.html?movie_id=${movie.id}" aria-label="${movie.title}">
            <img src="${baseImgUrl + movie.poster_path}" alt="${movie.title}" />
            <h2 class="movie__title">${movie.title}</h2>
          </a>
          <p>⭐ ${movie.vote_average.toFixed(1)} / 10 IMDb</p>
        </article>
      `
      )
      .join("");

    wrapperElm.insertAdjacentHTML("beforeend", nowPlayingCards);

    // Render Popular (vertical list with genres + runtime placeholder)
    let popularCards = popularMovies
      .map((movie) => {
        const movieGenres = movie.genre_ids
          .map((id) => {
            const genre = genres.find((g) => g.id === id);
            return genre ? `<li class="genre-pill">${genre.name}</li>` : "";
          })
          .join(" ");

        return `
        <article class="movie">
          <a href="detail.html?movie_id=${movie.id}" aria-label="${movie.title}">
            <img src="${baseImgUrl + movie.poster_path}" alt="${movie.title}" />
          </a>
          <div>
            <h2 class="movie__title">${movie.title}</h2>
            <p>⭐ ${movie.vote_average.toFixed(1)} / 10 IMDb</p>
            <ul>${movieGenres}</ul>
            <p>⏱️ ${Math.floor(Math.random() * 2) + 1}h ${Math.floor(
          Math.random() * 60
        )}m</p>
          </div>
        </article>
      `;
      })
      .join("");

    popularElm.insertAdjacentHTML("beforeend", popularCards);
  }
);




