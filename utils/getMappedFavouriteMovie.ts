import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import { UserFavouriteMovie } from "../infrastructure/interfaces/User/user";
export const getMappedFavouriteMovie = (movie: Movie): UserFavouriteMovie => {
  return {
    ...movie,
    id: movie.id as string,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    overview: movie.overview,
    vote_average: movie.vote_average,
  };
};
