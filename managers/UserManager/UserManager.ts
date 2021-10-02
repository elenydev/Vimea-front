import Store from "store/configureStore";
import { Store as StoreInterface } from "store/interfaces";
import {
  ChangePasswordUserCredentials,
  GetCurrentUser,
  User,
  UserCredentials,
  UserFavouriteMovie,
} from "infrastructure/interfaces/User/user";
import {
  authorization,
  removeUser,
  registration,
  remindPassword,
  addFavourite,
  removeFavourite,
  changePassword,
  getCurrentUser,
  getUserFavourites,
  changeAvatar
} from "components/User/domain/routines";
import { deleteCookie } from "services/cookieService";
import { USER_COOKIE, CURRENT_USER_EMAIL_COOKIE } from "utils/constants";
import { Text } from "dictionary/text";

export default class UserManager {
  public registerUser(userCredentials: User): void {
    Store.dispatch(registration.trigger(userCredentials));
  }

  public setUser(userCredentials: UserCredentials): void {
    Store.dispatch(authorization.trigger(userCredentials));
  }

  public removeUser(): void {
    deleteCookie(USER_COOKIE);
    deleteCookie(CURRENT_USER_EMAIL_COOKIE);
    Store.dispatch(removeUser.trigger());
  }

  public remindPassword(userEmail: string): void {
    Store.dispatch(remindPassword.trigger(userEmail));
  }

  public changePassword(userCredentials: ChangePasswordUserCredentials): void {
    const { newPassword, newPasswordConfirmation } = userCredentials;
    if (newPassword !== newPasswordConfirmation) {
      this.getStoreInstance().notificationsStore.notificationsManager.setErrorNotifications(
        Text.app.main.forms.validationErrors.errors.confirm_new_password
      );
      return;
    }

    Store.dispatch(changePassword.trigger(userCredentials));
  }

  public addFavourite(movie: UserFavouriteMovie): void {
    Store.dispatch(addFavourite.trigger(movie));
  }

  public removeFavourite(movieId: string): void {
    Store.dispatch(removeFavourite.trigger(movieId));
  }

  public getCurrentUser(credentials: GetCurrentUser): void {
    Store.dispatch(getCurrentUser.trigger(credentials));
  }

  public getCurrentUserFavourites(email: string): void {
    Store.dispatch(getUserFavourites.trigger(email));
  }

  public getStoreInstance(): StoreInterface {
    return Store.getState() as StoreInterface;
  }

  public getCurrentUserInstance(): User {
    return this.getStoreInstance().userStore.user;
  }

  public changeAvatar(avatar: File): void {
    Store.dispatch(changeAvatar.trigger(avatar));
  }
}
