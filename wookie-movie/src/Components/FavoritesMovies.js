import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import "../Style/favoritesMovies.css";
import { getCurrentMoviesId } from "../store/moviesContext/moviesSlice";
import { Link } from "react-router-dom";

function FavoritesMovies() {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  //Au click sur un poster on affiche le détail du film avec MovieCard component
  const handleClick = (id) => {
    dispatch(getCurrentMoviesId(id));
  };

  //au chargement du composant on verifie si des films en favori sont présent dans le local storage et on setState le résultat pour afficher les posters
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
    }
  }, []);

  return (
    <Box className="boxFavorites" id="containerFavorites">
      {movies.length ? (
        movies.map((movie) => (
          <Link
            to="/"
            className="text-decoration"
            key={movie.id}
            id={"linkPosterFavorite" + movie.id}
          >
            <img
              className="poster"
              src={`${movie.poster}?w=164&h=164&fit=crop&auto=format`}
              alt={movie.title}
              loading="lazy"
              key={movie.id}
              id={"PosterFavorite" + movie.id}
              onClick={() => {
                handleClick(movie.id);
              }}
            />
          </Link>
        ))
      ) : (
        <p className="favoriteYet" id="favoriteYet">
          You don't have favorites yet
        </p>
      )}
    </Box>
  );
}

export default FavoritesMovies;
