import Store from "@/../store/configureStore";
import { User, UserCredentials } from "@/../infrastructure/interfaces/User/user";
import { authorization, removeUser, registration } from "./domain/actions";
import { deleteCookie } from "@/../services/cookieService";
import { USER_COOKIE } from "@/../constants";

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
}
