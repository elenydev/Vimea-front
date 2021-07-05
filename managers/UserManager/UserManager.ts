import Store from "@/../store/configureStore";
import { Store as StoreInterface} from '@/../store/interfaces';
import {
  ChangePasswordUserCredentials,
  GetCurrentUser,
  User,
  UserCredentials,
  UserFavouriteMovie,
} from "@/../infrastructure/interfaces/User/user";
import {
  authorization,
  removeUser,
  registration,
  remindPassword,
  addFavourite,
  removeFavourite,
  changePassword,
  getCurrentUser,
  getUserFavourites
} from "../../components/App/domain/actions";
import { deleteCookie } from "@/../services/cookieService";
import { USER_COOKIE } from "@/../constants";
import { Text } from "@/../dictionary/text";

export default class UserManager {
  public registerUser(userCredentials: User): void {
    Store.dispatch(registration.trigger(userCredentials));
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
}
