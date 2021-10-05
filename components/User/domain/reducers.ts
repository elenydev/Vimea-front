import { UserStore } from "components/User/domain/intefaces";
import { createSliceWithSaga } from "redux-toolkit-with-saga";
import { sagas } from "components/User/domain/sagas";
import {
  setUserManager,
  authorizationTrigger,
  authorizationSuccess,
  authorizationFailure,
  registerUserFailure,
  registerUserTrigger,
  registerUserSuccess,
  getCurrentUserSuccess,
  getUserFavouriteMoviesFailure,
  getUserFavouriteMoviesSuccess,
  getUserFavouriteMoviesTrigger,
  closeUserSession,
} from "components/User/domain/actions";

const initialState: UserStore = {
  manager: undefined,
  user: undefined,
  isLoading: false,
};

const userStore = createSliceWithSaga({
  name: "userStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(setUserManager, (state: UserStore, action) => {
        state.manager = action.payload;
      })
      .addCase(authorizationTrigger, (state: UserStore) => {
        state.isLoading = true;
      })
      .addCase(authorizationSuccess, (state: UserStore, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(authorizationFailure, (state: UserStore) => {
        state.isLoading = false;
      })
      .addCase(registerUserTrigger, (state: UserStore) => {
        state.isLoading = true;
      })
      .addCase(registerUserSuccess, (state: UserStore) => {
        state.isLoading = false;
      })
      .addCase(registerUserFailure, (state: UserStore) => {
        state.isLoading = false;
      })
      .addCase(getCurrentUserSuccess, (state: UserStore, action) => {
        state.user = action.payload;
      })
      .addCase(getUserFavouriteMoviesTrigger, (state: UserStore) => {
        state.isLoading = true;
      })
      .addCase(getUserFavouriteMoviesSuccess, (state: UserStore, action) => {
        state.isLoading = false;
        state.user.favouriteMovies = action.payload;
      })
      .addCase(getUserFavouriteMoviesFailure, (state: UserStore) => {
        state.isLoading = false;
      })
      .addCase(closeUserSession, (state: UserStore) => {
        state.user = undefined
      })
  },
  reducers: {},
  effects: { ...sagas },
});

export const {
  authorization,
  registerUser,
  remindUserPassword,
  addFavouriteMovie,
  removeFavouriteMovie,
  changeUserPassword,
  getCurrentUserCredentials,
  getFavouriteMovies,
  changeUserAvatar,
} = userStore.effectActions;
export const userStoreCallEffects = userStore.callEffects;

export default userStore.reducer;
