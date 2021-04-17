import Store from "@/../store/configureStore";
import { User, UserCredentials, UserFavouriteMovie } from "@/../infrastructure/interfaces/User/user";
import { authorization, removeUser, registration, remindPassword, addFavourite, removeFavourite } from "./domain/actions";
import { deleteCookie } from "@/../services/cookieService";
import { USER_COOKIE } from "@/../constants";
import { ResponseStatus } from "@/../infrastructure/enums/Request/Request";

export default class UserManager {

  public registerUser(userCredentials: User): void {
    Store.dispatch(registration.trigger(userCredentials))
  }

  public setUser(userCredentials: UserCredentials): void {
    Store.dispatch(authorization.trigger(userCredentials));
  }

  public removeUser(): void {
    Store.dispatch(removeUser());
    deleteCookie(USER_COOKIE);
  }

  public remindPassword(userEmail: string): void {
    Store.dispatch(remindPassword.trigger(userEmail));
  }

  public addFavourite(movie: UserFavouriteMovie): void {
    Store.dispatch(addFavourite.trigger(movie));
  }

  public removeFavourite(movieId: string): void {
    Store.dispatch(removeFavourite.trigger(movieId));
  }
}