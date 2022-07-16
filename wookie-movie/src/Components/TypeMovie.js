import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentMoviesId } from "../store/moviesContext/moviesSlice";

import "../Style/typeMovie.css";

function TypeMovie({ type }) {
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  // au click sur le poster d'un film on envoie l'id du film en question dans le store pour l'afficher dans MovieCard component
  const handleClick = (id) => {
    dispatch(getCurrentMoviesId(id));
  };
  return (
    <Box className="boxPoster" id={"containerPoster" + type}>
      {movies?.map((movie) =>
        Array.isArray(movie.genres) && movie.genres.includes(type) ? (
          <img
            className="poster"
            src={`${movie.poster}?w=164&h=164&fit=crop&auto=format`}
            alt={type}
            loading="lazy"
            key={movie.id}
            id={"poster" + movie.id}
            onClick={() => {
              handleClick(movie.id);
            }}
          />
        ) : movie.genres === type ? (
          <img
            className="poster"
            src={`${movie.poster}?w=164&h=164&fit=crop&auto=format`}
            alt={type}
            loading="lazy"
            key={movie.id}
            id={"poster" + movie.id}
            onClick={() => {
              handleClick(movie.id);
            }}
          />
        ) : (
          ""
        )
      )}
    </Box>
  );
}

export default TypeMovie;
