import { put, takeLatest, ForkEffect } from "redux-saga/effects";
import { Action } from "@/../utils/redux/reduxActions";
import { handleAuthorization } from "@/../requests/auth/authRequests";
import {
  RegistrationRequestResult,
  UserCredentials,
} from "@/../infrastructure/interfaces/User/user";
import * as actions from "@/../components/App/domain/actions";

function* setUser(action: Action<UserCredentials>) {
  const user = action.payload;
  try {
    const response: RegistrationRequestResult = yield handleAuthorization(user);
    yield put(actions.authorization(user));
  } catch (e) {
    console.log(e);
    // errorhandling....
  }
}

export default function* userSagas(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(actions.authorization, setUser);
}
