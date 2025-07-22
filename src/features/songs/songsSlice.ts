import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Song } from "../../api/songs";

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  limit: number;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
  page: 1,
  total: 0,
  limit: 6,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (
      state,
      action: { payload: { page?: number; limit?: number } }
    ) => {
      state.loading = true;
      if (action.payload && action.payload.page)
        state.page = action.payload.page;
    },
    fetchSongsSuccess: (
      state,
      action: { payload: { songs: Song[]; total: number } }
    ) => {
      state.songs = action.payload.songs;
      state.total = action.payload.total;
      state.loading = false;
    },
    fetchSongsFailure: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    },
    createSongRequest: (state, action: { payload: Song }) => {
      state.loading = true;
    },
    createSongSuccess: (state, action: { payload: Song }) => {
      state.songs.unshift(action.payload);
      state.loading = false;
    },
    createSongFailure: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSongRequest: (
      state,
      action: { payload: { id: string | number; data: Song } }
    ) => {
      state.loading = true;
    },
    updateSongSuccess: (state, action: { payload: Song }) => {
      const idx = state.songs.findIndex((s) => s.id === action.payload.id);
      if (idx !== -1) state.songs[idx] = action.payload;
      state.loading = false;
    },
    updateSongFailure: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSongRequest: (state, action: { payload: string | number }) => {
      state.loading = true;
    },
    deleteSongSuccess: (state, action: { payload: string | number }) => {
      state.songs = state.songs.filter((s) => s.id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPage: (state, action: { payload: number }) => {
      state.page = action.payload;
    },
  },
});

export const {
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
  setPage,
} = songsSlice.actions;

export default songsSlice.reducer;
