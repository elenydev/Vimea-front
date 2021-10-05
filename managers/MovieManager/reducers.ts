import { MovieStore } from "managers/MovieManager/interfaces";
import { createSliceWithSaga } from "redux-toolkit-with-saga";
import {
  setMovieManager,
  setTrailerUrl,
  setUpcomingMovies,
  toggleTrailerVisibility,
} from "managers/MovieManager/actions";

const initialState: MovieStore = {
  manager: undefined,
  upcomingMovies: [],
  isTrailerVisible: false,
  movieTrailerUrl: "",
};

const movieSlice = createSliceWithSaga({
  name: "movieStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setMovieManager, (state: MovieStore, action) => {
        state.manager = action.payload;
      })
      .addCase(setTrailerUrl, (state: MovieStore, action) => {
        state.movieTrailerUrl = action.payload;
      })
      .addCase(setUpcomingMovies, (state: MovieStore, action) => {
        state.upcomingMovies = action.payload;
      })
      .addCase(toggleTrailerVisibility, (state: MovieStore) => {
        state.isTrailerVisible = !state.isTrailerVisible;
      });
  },
});

export default movieSlice.reducer;
