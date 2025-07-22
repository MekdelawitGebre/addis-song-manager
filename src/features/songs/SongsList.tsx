import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSongsRequest,
  createSongRequest,
  updateSongRequest,
  deleteSongRequest,
  setPage,
} from "./songsSlice";
import { RootState } from "../../app/store";
import { Song } from "../../api/songs";
import { AppDispatch } from "../../app/store";
import SongCard from "../../components/SongCard";
import SongModal from "../../components/SongModal";
import Toast from "../../components/Toast";
import React from "react";
import styled from "@emotion/styled";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.18);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ConfirmBox = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(80, 80, 180, 0.18);
  padding: 32px 32px 24px 32px;
  min-width: 320px;
  max-width: 95vw;
  text-align: center;
`;
const ConfirmActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-top: 24px;
`;
const ConfirmButton = styled.button<{ danger?: boolean }>`
  padding: 10px 28px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ danger }) => (danger ? "#d32f2f" : "#fff")};
  color: ${({ danger }) => (danger ? "#fff" : "#6a0dad")};
  border: ${({ danger }) => (danger ? "none" : "1.5px solid #6a0dad")};
  transition: background 0.2s;
`;

const SongsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { songs, loading, error, page, total, limit } = useSelector(
    (state: RootState) => state.songs
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | number | null>(null);
  const [modalInitial, setModalInitial] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<
    string | number | null
  >(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSongsRequest({ page, limit }));
  }, [dispatch, page, limit]);

  const openAddModal = () => {
    setModalInitial({ title: "", artist: "", album: "", year: "" });
    setIsEdit(false);
    setEditId(null);
    setModalOpen(true);
  };

  const openEditModal = (song: Song) => {
    setModalInitial({
      title: song.title,
      artist: song.artist,
      album: song.album,
      year: String(song.year ?? ""),
    });
    setIsEdit(true);
    setEditId(song.id ?? "");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditId(null);
    setIsEdit(false);
  };

  const handleModalSubmit = (values: {
    title: string;
    artist: string;
    album: string;
    year: string;
  }) => {
    const submitValues = { ...values, year: String(values.year) };
    if (isEdit && editId !== null) {
      dispatch(updateSongRequest({ id: editId, data: submitValues }));
    } else {
      dispatch(createSongRequest(submitValues));
      setToastMessage("New song is created on the last page");
    }
    setModalOpen(false);
    setEditId(null);
    setIsEdit(false);
  };

  const handleDelete = (id: number | string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId !== null) {
      dispatch(deleteSongRequest(pendingDeleteId));
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "0 16px" }}>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "32px 0 24px 0",
          maxWidth: 1300,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <button
          onClick={openAddModal}
          style={{
            background: "#7c3aed",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "8px 20px",
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(124,58,237,0.08)",
          }}
        >
          + Add Song
        </button>
      </div>
      <SongModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialValues={modalInitial}
        isEdit={isEdit}
      />
      {confirmOpen && (
        <ConfirmOverlay>
          <ConfirmBox>
            <div
              style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 18 }}
            >
              Are you sure you want to delete this song?
            </div>
            <ConfirmActions>
              <ConfirmButton onClick={handleCancelDelete}>Cancel</ConfirmButton>
              <ConfirmButton danger onClick={handleConfirmDelete}>
                Delete
              </ConfirmButton>
            </ConfirmActions>
          </ConfirmBox>
        </ConfirmOverlay>
      )}
      <CardGrid>
        {[...songs]
          .sort((a, b) => Number(b.id ?? 0) - Number(a.id ?? 0))
          .map((song: Song) => {
            const id = song.id ?? "";
            return (
              <SongCard
                key={id}
                id={id}
                title={song.title}
                artist={song.artist}
                album={song.album}
                year={String(song.year ?? "")}
                onEdit={() => openEditModal(song)}
                onDelete={() => handleDelete(id)}
              />
            );
          })}
      </CardGrid>
      <div
        style={{
          marginTop: 32,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => dispatch(setPage(page - 1))}
          disabled={page <= 1}
          style={{
            padding: "8px 18px",
            borderRadius: 8,
            border: "none",
            background: page <= 1 ? "#eee" : "#7c3aed",
            color: page <= 1 ? "#aaa" : "#fff",
            fontWeight: 600,
            cursor: page <= 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#7c3aed" }}>
          {page}
        </span>
        <button
          onClick={() => dispatch(setPage(page + 1))}
          disabled={page >= totalPages}
          style={{
            padding: "8px 18px",
            borderRadius: 8,
            border: "none",
            background: page >= totalPages ? "#eee" : "#7c3aed",
            color: page >= totalPages ? "#aaa" : "#fff",
            fontWeight: 600,
            cursor: page >= totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SongsList;
