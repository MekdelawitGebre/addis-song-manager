import { FC } from "react";
import styled from "@emotion/styled";
import {
  FaTrashAlt,
  FaEdit,
  FaUser,
  FaCompactDisc,
  FaCalendarAlt,
} from "react-icons/fa";

import React from "react";

interface SongCardProps {
  title: string;
  artist: string;
  album: string;
  year: string | number;
  id: number | string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Card = styled.div`
  border-radius: 20px;
  background: #f8faff;
  box-shadow: 0 4px 24px rgba(80, 80, 180, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
`;

const CardTop = styled.div`
  width: 100%;
  background: linear-gradient(135deg, rgb(244, 147, 231) 0%, #5f72bd 100%);
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 170px;
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

const CardContent = styled.div`
  background: #fff;
  padding: 0 28px 24px 28px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h3`
  margin: 18px 0 10px 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: #222;
  text-align: left;
`;

const Meta = styled.div`
  font-size: 1.08rem;
  color: #444;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 18px;
  width: 90%;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 5px 0;
  border-radius: 10px;
  border: 1.5px solid #e0e0e0;
  background: #fff;
  color: #222;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: #f3e8ff;
    color: #7c3aed;
    border-color: #b993f4;
  }
`;

const SongCard: FC<SongCardProps> = ({
  title,
  artist,
  album,
  year,
  onEdit,
  onDelete,
}) => (
  <Card>
    <CardTop>
      <Icon>💿</Icon>
    </CardTop>
    <CardContent>
      <Title>{title}</Title>
      <Meta>
        <FaUser /> {artist}
      </Meta>
      <Meta>
        <span role="img" aria-label="album">
          💿
        </span>{" "}
        {album}
      </Meta>
      <Meta>
        <span role="img" aria-label="year">
          📅
        </span>{" "}
        {year}
      </Meta>
      <Actions>
        {onEdit && (
          <ActionButton onClick={onEdit}>
            <FaEdit />
            Edit
          </ActionButton>
        )}
        {onDelete && (
          <ActionButton onClick={onDelete}>
            <FaTrashAlt /> Delete
          </ActionButton>
        )}
      </Actions>
    </CardContent>
  </Card>
);

export default SongCard;
