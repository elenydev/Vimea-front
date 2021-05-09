import { Movie } from "@/../infrastructure/interfaces/Movie/movie";
import { UserFavouriteMovie } from "../infrastructure/interfaces/User/user";
export const getMappedFavouriteMovie = (movie: Movie): UserFavouriteMovie => {
  return {
    movieId: movie.id as string,
    movieTitle: movie.title,
    movieAvatarUrl: movie.backdrop_path,
    movieDescription: movie.overview,
    movieRate: movie.vote_average,
  };
};
