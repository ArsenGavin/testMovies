import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TypeMovie from "./TypeMovie";
import "../Style/typesMovies.css";
import { useSelector } from "react-redux";

function TypesMovies() {
  const [tabTypesMovies, setTabTypesMovies] = useState([]);

  const { movies } = useSelector((state) => state.movies);

  //On actualise le composant des que les data de film sont charger, on fait une liste des genres de film sans doublon
  useEffect(() => {
    let tab = [];
    const getTypes = () => {
      movies?.map((movie) => {
        if (Array.isArray(movie.genres)) {
          movie.genres.map((genre) => {
            if (!tab.includes(genre)) {
              tab.push(genre);
            }
          });
        } else {
          if (!tab.includes(movie.genres)) {
            tab.push(movie.genres);
          }
        }
      });
      setTabTypesMovies(tab);
    };
    console.log(tabTypesMovies);
    getTypes();
  }, [movies]);

  return (
    <Box className="boxTypesMovies" id="containerTypes">
      {tabTypesMovies?.map((type) => {
        return (
          <Box className="boxTypeMovie" id={"genre" + type} key={type}>
            <Typography
              variant="body1"
              className="typoTypesMovies"
              gutterBottom
            >
              {type}
            </Typography>
            <TypeMovie type={type} />
          </Box>
        );
      })}
    </Box>
  );
}

export default TypesMovies;
