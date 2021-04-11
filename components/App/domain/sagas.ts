import { put, takeLatest, ForkEffect, select } from "redux-saga/effects";
import { Action } from "@/../utils/Redux";
import { handleAuthorization, handleRegistration } from "@/../requests/auth/authRequests";
import {
  RegistrationRequestResult,
  User,
  UserCredentials,
} from "@/../infrastructure/interfaces/User/user";
import { authorization, registration } from "@/../components/App/domain/actions";
import { setCookie } from "@/../services/cookieService";
import { USER_COOKIE } from "@/../constants";
import { getNotificationManager } from "../../Notifications/domain/selectors";
import NotificationsManager from "../../Notifications/NotificationsManager";
import Router from 'next/router';
import { ROUTES } from "@/../routes";

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
    console.log(response)
    notificationsManager.setErrorNotifications(response.responseMessage);
  } catch (errorMessage) {
    yield put(registration.failure(errorMessage));
    notificationsManager.setErrorNotifications(errorMessage);
  }
}

export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(authorization.trigger, setUser);
  yield takeLatest(registration.trigger, registerUser)
}
