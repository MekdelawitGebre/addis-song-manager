import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SongCard from "../components/SongCard";

test("renders song details", () => {
  const { getByText } = render(
    <SongCard
      id="1"
      title="Test Song"
      artist="Test Artist"
      album="Test Album"
      year="2024"
    />
  );
  expect(getByText("Test Song")).toBeInTheDocument();
  expect(getByText("Test Artist")).toBeInTheDocument();
  expect(getByText("Test Album")).toBeInTheDocument();
  expect(getByText("2024")).toBeInTheDocument();
});
