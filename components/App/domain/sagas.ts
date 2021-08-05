import { put, takeLatest, ForkEffect, select } from "redux-saga/effects";
import { Action } from "utils/redux";
import {
  getCurrentUser as getCurrentUserRequest,
  handleAuthorization,
  handleChangePassword,
  handleRegistration,
  handleRemindPassword,
} from "requests/auth/authRequests";
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
import {
  addFavourite,
  authorization,
  changePassword,
  registration,
  remindPassword,
  removeFavourite,
  getCurrentUser,
  getUserFavourites,
} from "components/App/domain/actions";
import { setCookie } from "services/cookieService";
import { CURRENT_USER_EMAIL_COOKIE, USER_COOKIE } from "utils/constants";
import { getNotificationManager } from "components/Notifications/domain/selectors";
import NotificationsManager from "components/Notifications/NotificationsManager";
import Router from "next/router";
import { ROUTES } from "routes";
import {
  addUserFavouriteMovie,
  fetchUserFavouriteMovies,
  removeUserFavouriteMovie,
} from "requests/userDetails/userDetailsRequests";
import { getUser } from "components/App/domain/selectors";
import FormManager from "managers/FormManager/FormManager";
import { getFormManager } from "managers/FormManager/selectors";
import { FORM_INSTANCE_NAME } from "infrastructure/enums/Form/form";

function* setUser(action: Action<UserCredentials>) {
  const user = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: RegistrationRequestResult = yield handleAuthorization(user);
    if (response.user) {
      yield put(authorization.success(response.user));
      setCookie(USER_COOKIE, response.user?.accessToken);
      setCookie(CURRENT_USER_EMAIL_COOKIE, response.user?.email);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.AUTHORIZATION);
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      Router.replace(ROUTES.USER.HOME)
      return;
    }
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(authorization.failure(errorMessage));
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
    if (response.user) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.REGISTRATION);
      Router.replace(ROUTES.AUTH.SIGN_IN);
      return;
    }
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(registration.failure(errorMessage));
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
    if (response.user) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.REMIND_PASSWORD);
      Router.push(ROUTES.AUTH.SIGN_IN);
      return;
    }
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(remindPassword.failure(errorMessage));
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
    if (response.favouriteMovies) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      yield put(addFavourite.success(response.favouriteMovies));
      return;
    }
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(addFavourite.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* removeFavouriteMovie(action: Action<string>) {
  const movieId = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const currentUser: User = yield select(getUser);
  try {
    const response: UserMovieActionResult = yield removeUserFavouriteMovie(
      movieId,
      currentUser.email
    );
    if (response.favouriteMovies) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      yield put(removeFavourite.success(response.favouriteMovies));
      return;
    }
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(removeFavourite.failure(errorMessage));
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
    if (response.user) {
      yield put(changePassword.success(response.user));
      setCookie(USER_COOKIE, response.user?.accessToken);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.CHANGE_PASSWORD);
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      return;
    }
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(changePassword.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* getCurrent(action: Action<GetCurrentUser>) {
  try {
    const response: RegistrationRequestResult = yield getCurrentUserRequest(
      action.payload
    );

    if (response.user) {
      yield put(getCurrentUser.success(response.user));
      setCookie(USER_COOKIE, response.user?.accessToken);
      setCookie(CURRENT_USER_EMAIL_COOKIE, response.user?.email);
      return;
    }
  } catch (errorMessage) {
    yield put(getCurrentUser.failure(errorMessage));
  }
}

function* getFavouriteMovies(action: Action<string>) {
  const userEmail = action.payload;
  try {
    const response: UserMovieActionResult = yield fetchUserFavouriteMovies(
      userEmail
    );
    if (response.favouriteMovies) {
      yield put(getUserFavourites.success(response.favouriteMovies));
      return;
    }
  } catch (errorMessage) {
    yield put(getUserFavourites.failure(errorMessage));
  }
}


export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(authorization.trigger, setUser);
  yield takeLatest(registration.trigger, registerUser);
  yield takeLatest(remindPassword.trigger, remindUserPassword);
  yield takeLatest(changePassword.trigger, changeUserPassword);
  yield takeLatest(addFavourite.trigger, addFavouriteMovie);
  yield takeLatest(removeFavourite.trigger, removeFavouriteMovie);
  yield takeLatest(getCurrentUser.trigger, getCurrent);
  yield takeLatest(getUserFavourites.trigger, getFavouriteMovies);
}
