import { Store } from "store/interfaces";

export const getUpcomingMovies = (state: Store) =>
  state.movieStore.upcomingMovies;
export const getMovieManager = (state: Store) =>
  state.movieStore.manager;
