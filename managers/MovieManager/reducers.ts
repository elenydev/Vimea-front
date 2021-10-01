import { createReducer } from "deox";
import * as actions from 'managers/MovieManager/routines';
import { MovieStore, } from "managers/MovieManager/interfaces";

const initialState: MovieStore = {
  manager: undefined,
  upcomingMovies: [],
  isTrailerVisible: false,
  movieTrailerUrl: ''
};

const movieManagerReducer = createReducer(initialState, (handleAction) => [
  handleAction(actions.setMovieManager.success, (state, { payload }) => {
    return {
      ...state,
      manager: payload,
    };
  }),
  handleAction(actions.setTrailerUrl.success, (state, { payload }) => {
    return {
      ...state,
      movieTrailerUrl: payload
    };
  }),
  handleAction(actions.setUpcomingMovies.success, (state, { payload }) => {
    return {
      ...state,
      upcomingMovies: payload
    };
  }),
  handleAction(actions.toggleTrailerVisibility.success, (state) => {
    return {
      ...state,
      isTrailerVisible: !state.isTrailerVisible
    };
  }),
]);

export default movieManagerReducer;

