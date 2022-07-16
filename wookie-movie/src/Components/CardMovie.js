import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../Style/movieCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentMoviesId,
  updateFavorites,
} from "../store/moviesContext/moviesSlice";
import CloseIcon from "@mui/icons-material/Close";

function CardMovie() {
  const { movies, currentId } = useSelector((state) => state.movies);
  const [currentMovie, setCurrentMovie] = useState({});
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();

  // Ajout du film en favori dans le local storage
  const handleClickFav = () => {
    dispatch(updateFavorites(currentMovie));
    isFavOrNot();
  };

  const handleClickClose = () => {
    dispatch(getCurrentMoviesId(""));
  };

  //Verif si le film actuel est en favori dans le localstorage pour afficher la bonne icone
  const isFavOrNot = () => {
    const localMovies = localStorage.getItem("movies");
    if (localMovies?.includes(JSON.stringify(currentMovie))) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  };

  //on actualise le composant pour affichier les data du film actuel
  useEffect(() => {
    setCurrentMovie(movies.find((movie) => movie.id === currentId));
  }, [movies, currentId]);

  useEffect(() => {
    isFavOrNot();
  }, [currentMovie]);

  return (
    <Box className="mainBoxCard" id={"container1CardMovie" + currentId}>
      <Card
        className="containerCard"
        id={"card1CardMovie" + currentId}
        sx={{ maxWidth: 345 }}
      >
        <CardMedia
          component="img"
          height="140"
          image={currentMovie.poster}
          id={"imgCardMovie" + currentId}
          alt="green iguana"
        />
        <CardContent id={"card2CardMovie" + currentId} className="cardContent">
          <Box className="boxCard" id={"container2CardMovie" + currentId}>
            <Typography
              className="titleCard"
              gutterBottom
              variant="h5"
              component="div"
              id={"titleCardMovie" + currentId}
            >
              {currentMovie.title}
            </Typography>
            <Rating
              className=""
              id={"ratingCardMovie" + currentId}
              name="read-only"
              value={currentMovie.imdb_rating / 2}
              precision={0.1}
              small="true"
              readOnly
            />
          </Box>
          {isFav ? (
            <IconButton
              onClick={handleClickFav}
              className="iconBtn"
              aria-label="add to favorites"
              id={"removeIconBtnFavCardMovie" + currentId}
            >
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleClickFav}
              className="iconBtn"
              aria-label="add to favorites"
              id={"addIconBtnFavCardMovie" + currentId}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <IconButton
            onClick={handleClickClose}
            className="iconBtnAlt"
            aria-label="add to favorites"
            id={"addIconBtnFavCardMovie" + currentId}
          >
            <CloseIcon />
          </IconButton>
          <Box className="boxCardµAlt" id={"container3CardMovie" + currentId}>
            <Typography
              className="titleCardAlt"
              gutterBottom
              variant="subtitle1"
              component="div"
              color="text.secondary"
              id={"yearsCardMovie" + currentId}
            >
              years : {currentMovie.released_on?.substr(0, 4)}
            </Typography>
            <Typography
              className="titleCardAlt"
              id={"lenghtCardMovie" + currentId}
              gutterBottom
              variant="subtitle1"
              component="div"
              color="text.secondary"
            >
              lenght : {currentMovie.length}
            </Typography>
            <Typography
              className="titleCardAlt"
              id={"director" + currentId}
              gutterBottom
              variant="subtitle1"
              component="div"
              color="text.secondary"
            >
              director :{" "}
              {Array.isArray(currentMovie.director)
                ? currentMovie.director?.map((director, idx) => {
                    let text;
                    currentMovie.director.length === idx + 1
                      ? (text = director)
                      : (text = director + `, `);
                    return text;
                  })
                : currentMovie.director}
            </Typography>
          </Box>
          <Typography
            className="titleCardAlt"
            id={"castCardMovie" + currentId}
            gutterBottom
            variant="subtitle1"
            component="div"
            color="text.secondary"
          >
            cast :{" "}
            {currentMovie.cast?.map((cast, idx) => {
              let text;
              currentMovie.cast.length === idx + 1
                ? (text = cast)
                : (text = cast + `, `);
              return text;
            })}
          </Typography>
          <Typography
            id={"overviewCardMovie" + currentId}
            className="titleCardAlt"
            variant="subtitle1"
          >
            {currentMovie.overview}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardMovie;
