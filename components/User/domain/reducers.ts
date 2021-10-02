import { createReducer } from "deox";
import * as actions from "components/User/domain/routines";
import { UserStore } from "components/User/domain/intefaces";

const initialState: UserStore = {
  manager: undefined,
  user: undefined,
};

const userReducer = createReducer(initialState, (handleAction) => [
  handleAction(actions.setUserManager.success, (state, { payload }) => {
    return {
      ...state,
      manager: payload,
    };
  }),
  handleAction(actions.authorization.success, (state, { payload }) => {
    return {
      ...state,
      user: payload,
    };
  }),
  handleAction(actions.changePassword.success, (state, { payload }) => {
    return {
      ...state,
      user: payload,
    };
  }),
  handleAction(actions.removeUser.trigger, (state) => {
    return {
      ...state,
      user: undefined,
    };
  }),
  handleAction(actions.addFavourite.success, (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        favouriteMovies: payload,
      },
    };
  }),
  handleAction(actions.removeFavourite.success, (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        favouriteMovies: payload,
      },
    };
  }),
  handleAction(actions.getCurrentUser.success, (state, { payload }) => {
    return {
      ...state,
      user: payload,
    };
  }),
  handleAction(actions.getUserFavourites.success, (state, { payload }) => {
    return {
      ...state,
      user: {
        ...state.user,
        favouriteMovies: payload,
      },
    };
  }),
]);

export default userReducer;
