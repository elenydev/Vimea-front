import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import MovieManager from "./MovieManager";

export interface MovieStore {
  movieManager: MovieManager,
  upcomingMovies: Movie[]
};
