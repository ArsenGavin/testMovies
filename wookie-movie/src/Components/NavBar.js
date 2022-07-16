import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "../Style/navBar.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentMoviesId } from "../store/moviesContext/moviesSlice";
import { Link } from "react-router-dom";
import logo from "../Style/img/wookiemovieTitle.png";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { movies } = useSelector((state) => state.movies);
  const [moviesTitles, setMoviesTitles] = useState([]);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getCurrentMoviesId(""));
  };

  //si on ce trouve dans la page "/favorites" routeChange() nous permets de retourner a la page"/"" pour afficher correctement le detail du film avec CardMovie (routeChange() est appelé quand on selectionne un film dans l'autocomplete)
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  // quand on selectionne un film dans l'autocomplete on affiche le detail du film avec MovieCard component, nous faisons également un fetch comme demandé avec le titre du film en parametre, ne sachant pas quoi en faire je console.log() la reponse pour l'instant
  const selectMovie = (movieTitle) => {
    movieTitle == null
      ? dispatch(getCurrentMoviesId(""))
      : dispatch(
          getCurrentMoviesId(
            movies.find((movie) => movie.title === movieTitle).id
          ),
          routeChange()
        );
    const getData = async () => {
      let uri = `https://wookie.codesubmit.io/movies?q=` + movieTitle;

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
    getData()
      .then((data) => {
        console.log(data);
        return Promise.resolve();
      })
      .catch((error) => {
        console.log(error.message);
        return Promise.reject(error.message);
      });
  };

  // Une fois movies chargé on crée un tableau des titles pour les afficher dans l'autocomplete
  useEffect(() => {
    let tab = [];
    const getTitles = () => {
      movies?.map((data) => {
        tab.push(data.title);
        setMoviesTitles(tab);
        // setMoviesTitles((title) => [...title, data.title]);
      });
    };
    getTitles();
    console.log(movies);
  }, [movies]);

  return (
    <Box className="boxNavBarStyle" id="navBar">
      <Link to="/" id="linkNavBarHome" className="text-decoration">
        <img
          className="logoMenu"
          src={logo}
          alt="logo Wookie Movie"
          id="logoImg"
          loading="lazy"
          onClick={handleClick}
        ></img>
      </Link>
      <Box className="boxAutoFavStyle" id="container-Link-FavBtn-autoComplete">
        <Link to="/favorites" id="favBtnLink" className="text-decoration-alt">
          <Button variant="outlined" id="favBtn" className="favBtnStyle">
            Favorite
          </Button>
        </Link>
        <Autocomplete
          disablePortal
          id="autoComplete"
          className="autocompleteNavBarStyle"
          options={moviesTitles}
          sx={{ width: 150 }}
          size="small"
          onChange={(e, valeur) => {
            e.preventDefault();
            selectMovie(valeur);
          }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />{" "}
      </Box>
    </Box>
  );
}

export default NavBar;
