import {
  put,
  takeLatest,
  ForkEffect,
  takeEvery,
  select,
} from "redux-saga/effects";
import {
  getCurrentUser as getCurrentUserRequest,
  handleAuthorization,
  handleChangePassword,
  handleRegistration,
  handleRemindPassword,
} from "repositories/auth/auth";
import {
  ChangePasswordUserCredentials,
  GetCurrentUser,
  RegistrationRequestResult,
  RemindPasswordResult,
  User,
  UserCredentials,
  UserFavouriteMovie,
  UserMovieActionResult,
} from "infrastructure/interfaces/User/user";
import { getCookie, setCookie } from "services/cookieService";
import {
  CURRENT_USER_EMAIL_COOKIE,
  CURRENT_USER_ID,
  USER_COOKIE,
} from "utils/constants";
import { getNotificationManager } from "components/Notifications/domain/selectors";
import NotificationsManager from "managers/NotificationsManager/NotificationsManager";
import Router from "next/router";
import { ROUTES } from "routes";
import {
  addUserFavouriteMovie,
  fetchUserFavouriteMovies,
  removeUserFavouriteMovie,
} from "repositories/user/movies/movies";
import { handleAvatarChange } from "repositories/user/details/details";
import { getUser } from "components/User/domain/selectors";
import FormManager from "managers/FormManager/FormManager";
import { getFormManager } from "managers/FormManager/selectors";
import { FORM_INSTANCE_NAME } from "infrastructure/enums/Form/form";
import { ResponseStatus } from "infrastructure/enums/Request/Request";

import { Action } from "redux-actions";
import * as UserStoreActions from "components/User/domain/actions";

function* authorization(action: Action<UserCredentials>) {
  const user = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: RegistrationRequestResult = yield handleAuthorization(user);
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      yield put(UserStoreActions.authorizationSuccess(response.result));
      setCookie(USER_COOKIE, response.result?.accessToken);
      setCookie(CURRENT_USER_EMAIL_COOKIE, response.result?.email);
      setCookie(CURRENT_USER_ID, response.result?.userId);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.AUTHORIZATION);
      notificationsManager.setSuccesfullNotifications(response.message);
      return Router.replace(ROUTES.USER.HOME);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put({
      type: UserStoreActions.authorizationFailure,
    });
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* registerUser(action: Action<User>) {
  const user = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: RegistrationRequestResult = yield handleRegistration(user);
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      notificationsManager.setSuccesfullNotifications(response.message);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.REGISTRATION);
      yield put({ type: UserStoreActions.registerUserSuccess });
      return Router.replace(ROUTES.AUTH.SIGN_IN);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put({ type: UserStoreActions.registerUserFailure });
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* remindUserPassword(action: Action<string>) {
  const userEmail = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: RemindPasswordResult = yield handleRemindPassword(
      userEmail
    );
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      notificationsManager.setSuccesfullNotifications(response.message);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.REMIND_PASSWORD);
      return Router.push(ROUTES.AUTH.SIGN_IN);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* addFavouriteMovie(action: Action<UserFavouriteMovie>) {
  const newFavouriteUserMovie = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const currentUser: User = yield select(getUser);
  try {
    const response: UserMovieActionResult = yield addUserFavouriteMovie(
      newFavouriteUserMovie,
      currentUser.email
    );
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      notificationsManager.setSuccesfullNotifications(response.message);
      return yield put({
        type: UserStoreActions.getUserFavouriteMoviesTrigger,
      });
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* removeFavouriteMovie(action: Action<string>) {
  const movieId = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const userId: string = getCookie(CURRENT_USER_ID);
  try {
    const response: UserMovieActionResult = yield removeUserFavouriteMovie(
      movieId,
      userId
    );
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      notificationsManager.setSuccesfullNotifications(response.message);
      return yield put({
        type: UserStoreActions.getUserFavouriteMoviesTrigger,
      });
    }

    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* changeUserPassword(action: Action<ChangePasswordUserCredentials>) {
  const userCredentials = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: RegistrationRequestResult = yield handleChangePassword(
      userCredentials
    );
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      setCookie(USER_COOKIE, response.result?.accessToken);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.CHANGE_PASSWORD);
      return notificationsManager.setSuccesfullNotifications(response.message);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* getCurrentUserCredentials(action: Action<GetCurrentUser>) {
  try {
    const response: RegistrationRequestResult = yield getCurrentUserRequest(
      action.payload
    );
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      yield put(UserStoreActions.getCurrentUserSuccess(response.result));

      setCookie(USER_COOKIE, response.result?.accessToken);
      setCookie(CURRENT_USER_EMAIL_COOKIE, response.result?.email);
      return;
    }
  } catch (errorMessage) {
    yield put({ type: UserStoreActions.getCurrentUserFailure });
  }
}

function* getFavouriteMovies() {
  const userId: string = getCookie(CURRENT_USER_ID);
  const pageNumber = 1;
  const pageSize = 20; // TEMPORARY
  try {
    const response: UserMovieActionResult = yield fetchUserFavouriteMovies(
      userId,
      pageNumber,
      pageSize
    );
    yield put({
      type: UserStoreActions.getUserFavouriteMoviesSuccess,
      payload: response.favouriteMovies,
    });
  } catch (errorMessage) {
    yield put({ type: UserStoreActions.getUserFavouriteMoviesFailure });
  }
}

function* changeUserAvatar(action: Action<File>) {
  const avatar = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const currentUser = yield select(getUser);
  try {
    const response: RegistrationRequestResult = yield handleAvatarChange(
      avatar,
      currentUser.id
    );
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      setCookie(USER_COOKIE, response.result?.accessToken);
      return notificationsManager.setSuccesfullNotifications(response.message);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(UserStoreActions.authorizationTrigger, authorization);
  yield takeLatest(UserStoreActions.registerUserTrigger, registerUser);
  yield takeLatest(UserStoreActions.remindPasswordTrigger, remindUserPassword);
  yield takeLatest(UserStoreActions.changePasswordTrigger, changeUserPassword);
  yield takeLatest(
    UserStoreActions.addUserFavouriteMovieTrigger,
    addFavouriteMovie
  );
  yield takeLatest(
    UserStoreActions.removeUserFavouriteMovieTrigger,
    removeFavouriteMovie
  );
  yield takeLatest(
    UserStoreActions.getCurrentUserTrigger,
    getCurrentUserCredentials
  );
  yield takeLatest(
    UserStoreActions.getUserFavouriteMoviesTrigger,
    getFavouriteMovies
  );
  yield takeLatest(UserStoreActions.changeUserAvatarTrigger, changeUserAvatar);
}
