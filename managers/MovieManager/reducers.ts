import { Action, handleActions } from "utils/redux";
import { ReducerMap } from "redux-actions";
import * as actions from 'managers/MovieManager/actions';
import { MovieStore, } from "managers/MovieManager/interfaces";
import MovieManager from "managers/MovieManager/MovieManager";
import { Movie } from "infrastructure/interfaces/Movie/movie";

const initialState: MovieStore = {
  manager: undefined,
  upcomingMovies: [],
  isTrailerVisible: false,
  movieTrailerUrl: ''
};

const reducerMap: ReducerMap<MovieStore, any> = {
  [actions.setMovieManager]: (
    state,
    action: Action<MovieManager>
  ): MovieStore => ({
    ...state,
    manager: action.payload
  }),
  [actions.setUpcomingMovies]: (
    state,
    action: Action<Movie[]>
  ): MovieStore => ({
    ...state,
    upcomingMovies: action.payload
  }),
  [actions.toggleTrailerVisibility]: (
    state
  ): MovieStore => ({
    ...state,
    isTrailerVisible: !state.isTrailerVisible
  }),
  [actions.setTrailerUrl]: (
    state,
    action: Action<string>
  ): MovieStore => ({
    ...state,
    movieTrailerUrl: action.payload
  }),
};

export default handleActions(reducerMap, initialState);
