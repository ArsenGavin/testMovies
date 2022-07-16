import {
  ERROR_MOVIES,
  GET_MOVIES_SUCCESS,
  LOADING_MOVIES,
  ADD_CURRENT_ID,
  UPDATE_FAVORITES,
} from "../actions";

const initialState = {
  movies: [],
  error: "",
  loading: false,
  currentId: "",
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        movies: action.payload.movies,
      };
    case ERROR_MOVIES:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    case LOADING_MOVIES:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case ADD_CURRENT_ID:
      return {
        ...state,
        loading: false,
        error: "",
        currentId: action.payload.currentId,
      };
    case UPDATE_FAVORITES:
      return { ...state };
    default:
      return {
        ...state,
      };
  }
}
