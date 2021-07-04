import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import MovieManager from "@/../managers/MovieManager/MovieManager";

export interface MovieStore {
  manager: MovieManager,
  upcomingMovies: Movie[]
};
