import userSaga from "components/User/domain/sagas";
import { all, fork } from "redux-saga/effects";

export default function* root(): any {
  yield all([fork(userSaga)]);
}
