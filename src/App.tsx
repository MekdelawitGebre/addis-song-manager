import React from "react";
import SongsList from "./features/songs/SongsList";
import styled from "@emotion/styled";

const Header = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const MusicIcon = styled.span`
  font-size: 3.2rem;
  color: #a084ee;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    font-size: 2.1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(90deg, #a084ee 0%, #6a0dad 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const Subtitle = styled.div`
  font-size: 1.35rem;
  color: #444;
  margin-top: 0;
  font-weight: 400;
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-top: 4px;
  }
`;

const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #f8f6ff 0%, #eef3fc 100%);
  padding-left: 32px;
  padding-right: 32px;
  @media (max-width: 600px) {
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const App = () => (
  <MainContainer>
    <Header>
      <TitleRow>
        <MusicIcon role="img" aria-label="music">
          🎵
        </MusicIcon>
        <Title>Addis Song Manager</Title>
      </TitleRow>
      <Subtitle>Manage your music collection with ease</Subtitle>
    </Header>
    <SongsList />
  </MainContainer>
);

export default App;
