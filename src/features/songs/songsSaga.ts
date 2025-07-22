import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongs,
  createSong,
  updateSong,
  deleteSong,
  Song,
} from "../../api/songs";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from "./songsSlice";

function* handleFetchSongs(action: {
  payload: { page?: number; limit?: number };
}): Generator<any, void, any> {
  try {
    const page = action.payload?.page || 1;
    const limit = action.payload?.limit || 5;
    const data = yield call(fetchSongs, page, limit);
    yield put(fetchSongsSuccess(data));
  } catch (error: unknown) {
    const message =
      error && typeof error === "object" && "message" in error
        ? (error as any).message
        : "Unknown error";
    yield put(fetchSongsFailure(message));
  }
}

function* handleCreateSong(action: {
  payload: Song;
}): Generator<any, void, any> {
  try {
    yield call(createSong, action.payload);
  
    yield put(fetchSongsRequest({ page: 1 }));
   
  } catch (error: unknown) {
    const message =
      error && typeof error === "object" && "message" in error
        ? (error as any).message
        : "Unknown error";
    yield put(createSongFailure(message));
  }
}

function* handleUpdateSong(action: {
  payload: { id: string | number; data: Song };
}): Generator<any, void, any> {
  try {
    const song = yield call(updateSong, action.payload.id, action.payload.data);
    yield put(updateSongSuccess(song));
  } catch (error: unknown) {
    const message =
      error && typeof error === "object" && "message" in error
        ? (error as any).message
        : "Unknown error";
    yield put(updateSongFailure(message));
  }
}

function* handleDeleteSong(action: {
  payload: string | number;
}): Generator<any, void, any> {
  try {
    yield call(deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error: unknown) {
    const message =
      error && typeof error === "object" && "message" in error
        ? (error as any).message
        : "Unknown error";
    yield put(deleteSongFailure(message));
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest, handleFetchSongs);
  yield takeLatest(createSongRequest, handleCreateSong);
  yield takeLatest(updateSongRequest, handleUpdateSong);
  yield takeLatest(deleteSongRequest, handleDeleteSong);
}
