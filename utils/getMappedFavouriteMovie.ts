import { Movie } from "infrastructure/interfaces/Movie/movie";
import { UserFavouriteMovie } from "infrastructure/interfaces/User/user";
export const getMappedFavouriteMovie = (
  movie: Movie | UserFavouriteMovie
): UserFavouriteMovie => {
  return {
    ...movie,
    id: movie.id as string,
    externalApiId: movie.id.toString(),
    title: movie.title,
    backdropPathUrl:
      (movie as Movie).backdrop_path ||
      (movie as UserFavouriteMovie).backdropPathUrl,
    overview: movie.overview,
    vote_average: movie.vote_average,
  };
};
