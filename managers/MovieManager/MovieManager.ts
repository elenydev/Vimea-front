import { Movie } from "../../infrastructure/interfaces/Movie/movie";
import Store from "@/../store/configureStore";
import { setUpcomingMovies } from "./actions";

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
}