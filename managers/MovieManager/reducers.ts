import { Action, handleActions } from "@/../utils/redux";
import { ReducerMap } from "redux-actions";
import * as actions from '@/../managers/MovieManager/actions';
import { MovieStore, } from "./interfaces";
import MovieManager from "./MovieManager";
import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import { getMappedMovies } from "@/../utils/getMappedMovies";

const initialState: MovieStore = {
  movieManager: undefined,
  upcomingMovies: []
};

const reducerMap: ReducerMap<MovieStore, any> = {
  [actions.setMovieManager]: (
    state,
    action: Action<MovieManager>
  ): MovieStore => ({
    ...state,
    movieManager: action.payload
  }),
  [actions.setUpcomingMovies]: (
    state,
    action: Action<Movie[]>
  ): MovieStore => ({
    ...state,
    upcomingMovies: getMappedMovies(action.payload)
  }),
};

export default handleActions(reducerMap, initialState);
