// If you see errors about 'describe' or 'expect', install Jest types: npm i --save-dev @types/jest
import songsReducer, { createSongSuccess } from "../features/songs/songsSlice";
import { Song } from "../api/songs";

describe("songsSlice", () => {
  it("should add a new song to the state", () => {
    const initialState = {
      songs: [],
      loading: false,
      error: null,
      page: 1,
      total: 0,
      limit: 6,
    };
    const newSong: Song = {
      id: "100",
      title: "Test Song",
      artist: "Test Artist",
      album: "Test Album",
      year: 2024,
    };
    const nextState = songsReducer(initialState, createSongSuccess(newSong));
    expect(nextState.songs[0]).toEqual(newSong);
  });
});
