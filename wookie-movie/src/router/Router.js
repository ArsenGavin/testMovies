import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoritesMovies from "../Components/FavoritesMovies";
import Home from "../Components/Home";
import NavBar from "../Components/NavBar";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesMovies />} />
      </Routes>
    </BrowserRouter>
  );
}
