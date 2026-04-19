let genres;

fetch(" https://api.themoviedb.org/3/genre/movie/list", {
    headers:{
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
})
.then(reponse => reponse.json())
.then(data => {
    genres=data.genres
    console.log(genres)
})