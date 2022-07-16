import {
  ERROR_MOVIES,
  GET_MOVIES_SUCCESS,
  LOADING_MOVIES,
  ADD_CURRENT_ID,
  UPDATE_FAVORITES,
} from "../actions";

export const errorMoviesAction = (message) => ({
  type: ERROR_MOVIES,
  payload: { message },
});

export const getMoviesSuccessAction = (movies) => ({
  type: GET_MOVIES_SUCCESS,
  payload: { movies },
});

export const loadingMoviesAction = () => ({
  type: LOADING_MOVIES,
});

export const getCurrentMoviesIdAction = (currentId) => ({
  type: ADD_CURRENT_ID,
  payload: { currentId },
});

export const updateFavoritesAction = () => ({
  type: UPDATE_FAVORITES,
});
