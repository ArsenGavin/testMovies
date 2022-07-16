export let MOVIES_GENRES = [];
export let MOVIES_TITLES = [];
export let MOVIES_DATA = [];

const getMoviesService = async () => {
  let uri = `https://wookie.codesubmit.io/movies`;

  let h = new Headers();
  h.append("Authorization", "Bearer Wookie2021");

  let req = new Request(uri, {
    method: "GET",
    headers: h,
    credentials: "same-origin",
  });
  const response = await fetch(req);
  return response.json();
};

getMoviesService()
  .then((movies) => {
    MOVIES_DATA = movies.movies;
    MOVIES_DATA.map((movie) => {
      MOVIES_TITLES.push(movie.title);
    });
    MOVIES_DATA?.map((movie) => {
      if (Array.isArray(movie.genres)) {
        movie.genres.map((genre) => {
          if (!MOVIES_GENRES.includes(genre)) {
            MOVIES_GENRES.push(genre);
          }
        });
      } else {
        if (!MOVIES_GENRES.includes(movie.genres)) {
          MOVIES_GENRES.push(movie.genres);
        }
      }
    });
    return Promise.resolve();
  })
  .catch((error) => {
    return Promise.reject(error.message);
  });
