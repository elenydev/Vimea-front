import { Movie, MovieTrailer, MovieTrailerResponse } from "@/../infrastructure/interfaces/Movie/movie";

export const getLatestMovies = async (): Promise<Movie[]> => {
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const response = await request.json();
  return response.results;
}

export const getCurrentMovieTrailer = async(movieId: string): Promise<MovieTrailer> => {
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`
  );
  const response: MovieTrailerResponse = await request.json();
  return response.results[0];
}