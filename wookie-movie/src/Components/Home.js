import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TypesMovies from "./TypesMovies";
import CardMovie from "./CardMovie";
import { getMovies } from "../store/moviesContext/moviesSlice";

function Home() {
  const dispatch = useDispatch();
  const { currentId } = useSelector((state) => state.movies);

  // Call Api pour récupérer les films
  useEffect(() => {
    dispatch(getMovies());
  }, []);

  return <>{currentId ? <CardMovie /> : <TypesMovies />}</>;
}

export default Home;
