import MovieManager from "managers/MovieManager/MovieManager";
import { createAction } from "@reduxjs/toolkit";
import { Movie } from "infrastructure/interfaces/Movie/movie";

export enum MovieStoreActions {
    SetMovieManager = 'movieStore/setMovieManager',
    SetTrailerUrl = 'movieStore/setTrailerUrl',
    SetUpcomingMovies = 'movieStore/setUpcomingMovies',
    ToggleTrailerVisibility = 'movieStore/toggleTrailerVisibility'
}

export const setMovieManager = createAction<MovieManager>(MovieStoreActions.SetMovieManager);
export const setTrailerUrl = createAction<string>(MovieStoreActions.SetTrailerUrl);
export const setUpcomingMovies = createAction<Movie[]>(MovieStoreActions.SetUpcomingMovies);
export const toggleTrailerVisibility = createAction(MovieStoreActions.ToggleTrailerVisibility);
