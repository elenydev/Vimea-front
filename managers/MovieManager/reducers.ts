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
  handleAction(actions.setMovieManager.trigger, (state, { meta }) => {
    return {
      ...state,
      manager: meta,
    };
  }),
  handleAction(actions.setTrailerUrl.trigger, (state, { meta }) => {
    return {
      ...state,
      movieTrailerUrl: meta
    };
  }),
  handleAction(actions.setUpcomingMovies.trigger, (state, { meta }) => {
    return {
      ...state,
      upcomingMovies: meta
    };
  }),
  handleAction(actions.toggleTrailerVisibility.trigger, (state) => {
    return {
      ...state,
      isTrailerVisible: !state.isTrailerVisible
    };
  }),
]);

export default movieManagerReducer;

