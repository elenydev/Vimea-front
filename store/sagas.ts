import userSaga from "@/../components/App/domain/sagas";
import { all, fork } from "redux-saga/effects";

export default function* root(): any {
  yield all([fork(userSaga)]);
}
