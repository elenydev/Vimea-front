import Store from "store/configureStore";
import { Store as StoreInterface } from "store/interfaces";
import {
  ChangePasswordUserCredentials,
  GetCurrentUser,
  User,
  UserCredentials,
  UserFavouriteMovie,
} from "infrastructure/interfaces/User/user";
import * as UserStoreActions from "components/User/domain/actions";
import { deleteCookie } from "services/cookieService";
import { USER_COOKIE, CURRENT_USER_EMAIL_COOKIE, CURRENT_USER_ID } from "contants";
import { Text } from "dictionary/text";

export default class UserManager {
  public registerUser(userCredentials: User): void {
    Store.dispatch(UserStoreActions.registerUserTrigger(userCredentials));
  }

  public setUser(userCredentials: UserCredentials): void {
    Store.dispatch(UserStoreActions.authorizationTrigger(userCredentials));
  }

  public removeUser(): void {
    Store.dispatch(UserStoreActions.closeUserSession());
    deleteCookie(USER_COOKIE);
    deleteCookie(CURRENT_USER_EMAIL_COOKIE);
    deleteCookie(CURRENT_USER_ID);
  }

  public remindPassword(userEmail: string): void {
    Store.dispatch(UserStoreActions.remindPasswordTrigger(userEmail));
  }

  public changePassword(userCredentials: ChangePasswordUserCredentials): void {
    const { newPassword, newPasswordConfirmation } = userCredentials;
    if (newPassword !== newPasswordConfirmation) {
      this.getStoreInstance().notificationsStore.notificationsManager.setErrorNotifications(
        Text.app.main.forms.validationErrors.errors.confirm_new_password
      );
      return;
    }

    Store.dispatch(UserStoreActions.changePasswordTrigger(userCredentials));
  }

  public addFavourite(movie: UserFavouriteMovie): void {
    Store.dispatch(UserStoreActions.addUserFavouriteMovieTrigger(movie));
  }

  public removeFavourite(movieId: string): void {
    Store.dispatch(UserStoreActions.removeUserFavouriteMovieTrigger(movieId));
  }

  public getCurrentUser(credentials: GetCurrentUser): void {
    Store.dispatch(UserStoreActions.getCurrentUserTrigger(credentials));
  }

  public getCurrentUserFavourites(): void {
    Store.dispatch(UserStoreActions.getUserFavouriteMoviesTrigger());
  }

  public getStoreInstance(): StoreInterface {
    return Store.getState() as StoreInterface;
  }

  public getCurrentUserInstance(): User {
    return this.getStoreInstance().userStore.user;
  }

  public changeAvatar(avatar: File): void {
    Store.dispatch(UserStoreActions.changeUserAvatarTrigger(avatar));
  }
}
