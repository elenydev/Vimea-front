import { User, UserFavouriteMovie } from "@/../infrastructure/interfaces/User/user";
import { Store } from "@/../store/interfaces";
import UserManager from "../../../managers/UserManager/UserManager";

export const getUser = (state: Store): User | undefined => state.userStore?.user;
export const getUserManager = (state: Store): UserManager | undefined => state.userStore?.manager;
export const getUserMovies = (state: Store): UserFavouriteMovie[] | undefined => state.userStore?.user?.favouriteMovies;
