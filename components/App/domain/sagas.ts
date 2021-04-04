import { put, takeLatest, ForkEffect } from "redux-saga/effects";
import { Action } from "@/../utils/Redux";
import { handleAuthorization } from "@/../requests/auth/authRequests";
import {
  RegistrationRequestResult,
  UserCredentials,
} from "@/../infrastructure/interfaces/User/user";
import { authorization } from "@/../components/App/domain/actions";

function* setUser(action: Action<UserCredentials>) {
  const user = action.payload;
  try {
    const response: RegistrationRequestResult = yield handleAuthorization(user);
    yield put(authorization.success(response.user));
  } catch (e) {
    yield put(authorization.failure(e));
  }
}

export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(authorization.trigger, setUser);
}
