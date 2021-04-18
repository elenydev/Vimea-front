import { put, takeLatest, ForkEffect, select } from "redux-saga/effects";
import { Action } from "@/../utils/redux";
import { handleAuthorization, handleChangePassword, handleRegistration, handleRemindPassword } from "@/../requests/auth/authRequests";
import {
  ChangePasswordUserCredentials,
  RegistrationRequestResult,
  RemindPasswordResult,
  User,
  UserCredentials,
  UserFavouriteMovie,
  UserMovieActionResult,
} from "@/../infrastructure/interfaces/User/user";
import { addFavourite, authorization, changePassword, registration, remindPassword, removeFavourite } from "@/../components/App/domain/actions";
import { setCookie } from "@/../services/cookieService";
import { USER_COOKIE } from "@/../constants";
import { getNotificationManager } from "../../Notifications/domain/selectors";
import NotificationsManager from "../../Notifications/NotificationsManager";
import Router from 'next/router';
import { ROUTES } from "@/../routes";
import { addUserFavouriteMovie, removeUserFavouriteMovie } from "@/../requests/userDetails/userDetailsRequests";

function* setUser(action: Action<UserCredentials>) {
  const user = action.payload;
  const notificationsManager: NotificationsManager = yield select(getNotificationManager);
  try {
    const response: RegistrationRequestResult = yield handleAuthorization(user);
    if (response.user) {
      yield put(authorization.success(response.user));
      setCookie(USER_COOKIE, response.user?.accessToken);
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
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
  const notificationsManager: NotificationsManager = yield select(getNotificationManager);
  try {
    const response: RegistrationRequestResult = yield handleRegistration(user);
    if (response.user) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      Router.push(ROUTES.AUTH.SIGN_IN);
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
  const notificationsManager: NotificationsManager = yield select(getNotificationManager);
  try {
    const response: RemindPasswordResult = yield handleRemindPassword(userEmail);
    if (response.user) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
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
  const notificationsManager: NotificationsManager = yield select(getNotificationManager);
  try {
    const response: UserMovieActionResult = yield addUserFavouriteMovie(newFavouriteUserMovie);
    if (response.favouriteMovies) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      addFavourite.success(response.favouriteMovies)
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
  const notificationsManager: NotificationsManager = yield select(getNotificationManager);
  try {
    const response: UserMovieActionResult = yield removeUserFavouriteMovie(movieId);
    if (response.favouriteMovies) {
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      removeFavourite.success(response.favouriteMovies)
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
  const notificationsManager: NotificationsManager = yield select(getNotificationManager);
  try {
    const response: RegistrationRequestResult = yield handleChangePassword(userCredentials);
    if (response.user) {
      yield put(changePassword.success(response.user));
      setCookie(USER_COOKIE, response.user?.accessToken);
      notificationsManager.setSuccesfullNotifications(response.responseMessage);
      return;
    }
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(changePassword.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
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
  yield takeLatest(removeFavourite.trigger, removeFavouriteMovie)
}
