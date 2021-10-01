import { Movie } from "infrastructure/interfaces/Movie/movie";
import Store from "store/configureStore";
import { setUpcomingMovies, setTrailerUrl, toggleTrailerVisibility } from "./routines";

interface MovieManagerProps {
  upcomingMovies: Movie[]
}

export default class MovieManager {
  constructor(props: MovieManagerProps) {
    this.setUpcomingMovies(props.upcomingMovies);
  }

  setUpcomingMovies(upcomingMovies: Movie[]): void {
    Store.dispatch(setUpcomingMovies(upcomingMovies));
  }

  setTrailerUrl(url: string): void {
    Store.dispatch(setTrailerUrl(url));
  }

  toggleTrailerVisibility(): void {
    Store.dispatch(toggleTrailerVisibility());
  }
}