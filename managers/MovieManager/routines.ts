import { Movie } from "infrastructure/interfaces/Movie/movie";
import { createRoutine } from "utils/redux/routines";
import MovieManager from "managers/MovieManager/MovieManager";

export enum MovieManagerRoutines {
    SetMovieManager = 'setMovieManager',
    SetUpcomingMovies = 'setUpcomingMovies',
    SetTrailerUrl = 'setTrailerUrl',
    toggleTrailerVisibility = 'toggleTrailerVisibility'
}

export const setMovieManager = createRoutine<MovieManager>(MovieManagerRoutines.SetMovieManager);
export const setUpcomingMovies = createRoutine<Movie[]>(MovieManagerRoutines.SetUpcomingMovies);
export const setTrailerUrl = createRoutine<string>(MovieManagerRoutines.SetTrailerUrl);
export const toggleTrailerVisibility = createRoutine(MovieManagerRoutines.toggleTrailerVisibility);