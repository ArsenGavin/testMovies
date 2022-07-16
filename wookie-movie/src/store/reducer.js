import { combineReducers } from "redux";
import moviesReducer from "./moviesContext/moviesReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
