import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

interface SongModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    artist: string;
    album: string;
    year: string;
  }) => void;
  initialValues?: {
    title: string;
    artist: string;
    album: string;
    year: string;
  };
  isEdit?: boolean;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(80, 80, 180, 0.18);
  padding: 32px 32px 24px 32px;
  min-width: 400px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const Title = styled.h2`
  margin: 0 0 24px 0;
  color: #2d1e5f;
  font-size: 2rem;
  font-weight: 700;
`;

const Field = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #4a4a4a;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d1d1;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 18px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 10px 28px;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ primary }) =>
    primary ? "linear-gradient(90deg, #a084ee 0%, #6a0dad 100%)" : "#fff"};
  color: ${({ primary }) => (primary ? "#fff" : "#6a0dad")};
  box-shadow: ${({ primary }) =>
    primary ? "0 2px 8px rgba(106,13,173,0.08)" : "none"};
  border: ${({ primary }) => (primary ? "none" : "1.5px solid #6a0dad")};
  transition: background 0.2s;
`;

const Close = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
`;

const SongModal: React.FC<SongModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  isEdit,
}) => {
  const [values, setValues] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });

  useEffect(() => {
    if (open) {
      setValues(
        initialValues || { title: "", artist: "", album: "", year: "" }
      );
    }
  }, [open, initialValues]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <Overlay>
      <Modal>
        <Close onClick={onClose} aria-label="Close">
          &times;
        </Close>
        <Title>{isEdit ? "Edit Song" : "Add Song"}</Title>
        <form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
              placeholder="Enter song title"
            />
          </Field>
          <Field>
            <Label htmlFor="artist">Artist *</Label>
            <Input
              id="artist"
              name="artist"
              value={values.artist}
              onChange={handleChange}
              required
              placeholder="Enter artist name"
            />
          </Field>
          <Field>
            <Label htmlFor="album">Album *</Label>
            <Input
              id="album"
              name="album"
              value={values.album}
              onChange={handleChange}
              required
              placeholder="Enter album name"
            />
          </Field>
          <Field>
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              name="year"
              value={values.year}
              onChange={handleChange}
              required
              placeholder="Enter year"
            />
          </Field>
          <Actions>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" primary>
              {isEdit ? "Update" : "Create"}
            </Button>
          </Actions>
        </form>
      </Modal>
    </Overlay>
  );
};

export default SongModal;
