import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL as string;

export interface Song {
  id?: string | number;
  title: string;
  artist: string;
  album: string;
  year: string | number;
}

export const fetchSongs = async (page: number = 1, limit: number = 5) => {
  const response = await axios.get(
    `${API_BASE_URL}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const createSong = async (song: Song) => {
  const response = await axios.post(API_BASE_URL, song);
  return response.data;
};

export const updateSong = async (id: string | number, song: Song) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, song);
  return response.data;
};

export const deleteSong = async (id: string | number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
