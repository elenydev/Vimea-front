import { put, takeLatest, ForkEffect, takeEvery, select } from "redux-saga/effects";
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
import {
  addFavourite,
  authorization,
  changePassword,
  registration,
  remindPassword,
  removeFavourite,
  getCurrentUser,
  getUserFavourites,
  changeAvatar,
} from "components/User/domain/routines";
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
} from "repositories/user/movies/movies";
import { handleAvatarChange } from "repositories/user/details/details";
import { getUser } from "components/User/domain/selectors";
import FormManager from "managers/FormManager/FormManager";
import { getFormManager } from "managers/FormManager/selectors";
import { FORM_INSTANCE_NAME } from "infrastructure/enums/Form/form";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import { Action } from "deox";

function* setUser(action: Action<'setUser', UserCredentials>) {
  const user = action.payload;
  const notificationsManager: NotificationsManager = yield select(
    getNotificationManager
  );
  const formManager: FormManager = yield select(getFormManager);
  try {
    const response: RegistrationRequestResult = yield handleAuthorization(user);
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      yield put(authorization.success(response.result));
      setCookie(USER_COOKIE, response.result?.accessToken);
      setCookie(CURRENT_USER_EMAIL_COOKIE, response.result?.email);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.AUTHORIZATION);
      notificationsManager.setSuccesfullNotifications(response.message);
      return Router.replace(ROUTES.USER.HOME);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put(authorization.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* registerUser(action: Action<'registration', User>) {
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
      return Router.replace(ROUTES.AUTH.SIGN_IN);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put(registration.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* remindUserPassword(action: Action<'remindPassword', string>) {
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
    yield put(remindPassword.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* addFavouriteMovie(action: Action<'addMovie', UserFavouriteMovie>) {
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
      return yield put(addFavourite.success(response.favouriteMovies));
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put(addFavourite.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* removeFavouriteMovie(action: Action<'removeMovie', string>) {
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
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      notificationsManager.setSuccesfullNotifications(response.message);
      return yield put(removeFavourite.success(response.favouriteMovies));
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put(removeFavourite.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* changeUserPassword(action: Action<'changePassword', ChangePasswordUserCredentials>) {
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
      yield put(changePassword.success(response.result));
      setCookie(USER_COOKIE, response.result?.accessToken);
      formManager.clearCurrentForm(FORM_INSTANCE_NAME.CHANGE_PASSWORD);
      return notificationsManager.setSuccesfullNotifications(response.message);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put(changePassword.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

function* getCurrent(action: Action<'getCurrentUser', GetCurrentUser>) {
  try {
    const response: RegistrationRequestResult = yield getCurrentUserRequest(
      action.payload
    );
    if (response.responseStatus === ResponseStatus.SUCCESS) {
      yield put(getCurrentUser.success(response.result));
      setCookie(USER_COOKIE, response.result?.accessToken);
      setCookie(CURRENT_USER_EMAIL_COOKIE, response.result?.email);
      return;
    }
  } catch (errorMessage) {
    yield put(getCurrentUser.failure(errorMessage));
  }
}

function* getFavouriteMovies(action: Action<'getMovies', string>) {
  const userEmail = action.payload;
  try {
    const response: UserMovieActionResult = yield fetchUserFavouriteMovies(
      userEmail
    );
    yield put(getUserFavourites.success(response.favouriteMovies));
  } catch (errorMessage) {
    yield put(getUserFavourites.failure(errorMessage));
  }
}

function* changeUserAvatar(action: Action<'changeAvatar', File>) {
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
      yield put(changeAvatar.success(response.result));
      setCookie(USER_COOKIE, response.result?.accessToken);
      return notificationsManager.setSuccesfullNotifications(response.message);
    }
    notificationsManager.setErrorNotifications(response.message);
  } catch (errorMessage) {
    yield put(changeAvatar.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(authorization.TRIGGER, setUser);
  yield takeLatest(registration.TRIGGER, registerUser);
  yield takeLatest(remindPassword.TRIGGER, remindUserPassword);
  yield takeLatest(changePassword.TRIGGER, changeUserPassword);
  yield takeLatest(addFavourite.TRIGGER, addFavouriteMovie);
  yield takeLatest(removeFavourite.TRIGGER, removeFavouriteMovie);
  yield takeLatest(getCurrentUser.TRIGGER, getCurrent);
  yield takeLatest(getUserFavourites.TRIGGER, getFavouriteMovies);
  yield takeLatest(changeAvatar.TRIGGER, changeUserAvatar);
}
