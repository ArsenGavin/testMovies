import { getMoviesService } from "../../services/moviesService.js";
import {
  errorMoviesAction,
  getMoviesSuccessAction,
  loadingMoviesAction,
  getCurrentMoviesIdAction,
} from "./moviesAction";

//On fetch les movies
export const getMovies = () => (dispatch) => {
  dispatch(loadingMoviesAction());
  return getMoviesService()
    .then((movies) => {
      dispatch(getMoviesSuccessAction(movies.movies));
      return Promise.resolve();
    })
    .catch((error) => {
      dispatch(errorMoviesAction(error.message));
      return Promise.reject(error.message);
    });
};

//On recupere l'id du film selectionner
export const getCurrentMoviesId = (id) => (dispatch) => {
  dispatch(loadingMoviesAction());
  try {
    dispatch(getCurrentMoviesIdAction(id));
    return Promise.resolve();
  } catch (error) {
    dispatch(errorMoviesAction(error.message));
    return Promise.reject(error.message);
  }
};

//On rajoute ou enleve les films rajouter en favori dans le localstorage
export const updateFavorites = (movie) => (dispatch) => {
  dispatch(loadingMoviesAction());
  try {
    const favorites = JSON.parse(localStorage.getItem("movies"));
    if (
      favorites &&
      Array.isArray(favorites) &&
      JSON.stringify(favorites).includes(JSON.stringify(movie))
    ) {
      const fav = favorites.filter(
        (f) => JSON.stringify(f) !== JSON.stringify(movie)
      );
      localStorage.setItem("movies", JSON.stringify(fav));
    } else if (
      favorites &&
      Array.isArray(favorites) &&
      !JSON.stringify(favorites).includes(JSON.stringify(movie))
    ) {
      favorites.push(movie);
      localStorage.setItem("movies", JSON.stringify(favorites));
    } else {
      localStorage.setItem("movies", JSON.stringify([movie]));
    }
    return Promise.resolve();
  } catch (error) {
    dispatch(errorMoviesAction(error.message));
    return Promise.reject(error.message);
  }
};
