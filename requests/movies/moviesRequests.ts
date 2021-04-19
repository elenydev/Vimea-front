import { Movie } from "@/../infrastructure/interfaces/Movie/movie";

export const getLatestMovies = async (): Promise<Movie[]> => {
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  const response = await request.json();
  return response.results;
}