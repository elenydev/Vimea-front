import {
  Movie,
  MovieTrailer,
  MovieTrailerResponse,
} from "infrastructure/interfaces/Movie/movie";
import Store from "store/configureStore";
import { Store as StoreInterface } from "store/interfaces";
import { Text } from "dictionary/text";

export const getLatestMovies = async (): Promise<Movie[]> => {
  const notificationsManager = (Store.getState() as StoreInterface).notificationsStore.notificationsManager;
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`
    );
    const response = await request.json();
    return response.results && response.results;
  } catch (error) {
    notificationsManager.setErrorNotifications(Text.app.main.common.fetchingLatestMoviesFailed);
  }
};

export const getCurrentMovieTrailer = async (
  movieId: string
): Promise<MovieTrailer> => {
  const notificationsManager = (Store.getState() as StoreInterface).notificationsStore.notificationsManager;
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`
    );
    const response: MovieTrailerResponse = await request.json();
    return response.results && response.results[0];
  } catch (error) {
    notificationsManager.setErrorNotifications(Text.app.main.common.fetchingLatestMoviesFailed);
  }
};
