import { Store } from "store/interfaces";

export const getUpcomingMovies = (state: Store) =>
  state.movieStore.upcomingMovies;
export const getMovieManager = (state: Store) =>
  state.movieStore.manager;
export const getIsTrailerVisible = (state: Store) => state.movieStore.isTrailerVisible;
export const getMovieTrailerUrl = (state: Store) => state.movieStore.movieTrailerUrl;