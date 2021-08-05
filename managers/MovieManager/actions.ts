import { Movie } from "infrastructure/interfaces/Movie/movie";
import { createAction } from "utils/redux/index";
import MovieManager from "managers/MovieManager/MovieManager";

export const setMovieManager = createAction<MovieManager>("setMovieManager");
export const setUpcomingMovies = createAction<Movie[]>("setUpcomingMovies");
