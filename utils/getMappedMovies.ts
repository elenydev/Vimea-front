import { Movie } from "../infrastructure/interfaces/Movie/movie";

export const getMappedMovies = (movies: Movie[]): Movie[] => {
  const baseMovieBackdropPath = 'https://image.tmdb.org/t/p/original';
  return movies.map(movie => {
    movie.backdrop_path = `${baseMovieBackdropPath}${movie.backdrop_path}`;
    movie.poster_path = `${baseMovieBackdropPath}${movie.poster_path}`;
    return movie;
  }
  );
}