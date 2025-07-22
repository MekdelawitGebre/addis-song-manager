import { all } from "redux-saga/effects";
import songsSaga from "../features/songs/songsSaga";

export default function* rootSaga() {
  yield all([songsSaga()]);
}
