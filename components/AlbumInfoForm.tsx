import React, { useState } from "react";
import { IAlbumInfo } from "../types/AlbumInfo";

interface IAlbumInfoFormProps {
  onSubmit: (albumInfo: IAlbumInfo) => void;
  loading: boolean;
}

const AlbumInfoForm: React.FC<IAlbumInfoFormProps> = ({
  onSubmit,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [mood, setMood] = useState("");
  const [colorScheme, setColorScheme] = useState("");
  const [artStyle, setArtStyle] = useState("");
  const [requests, setRequests] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const albumInfo: IAlbumInfo = {
      title,
      genre,
      theme,
      mood,
      colorScheme,
      artStyle,
      requests,
    };
    onSubmit(albumInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="title">Title</label>
      <input
        className="border-black border-2 rounded p-1"
        placeholder="Album title"
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="genre">Genre</label>
      <input
        className="border-black border-2 rounded p-1"
        placeholder="Music genre"
        type="text"
        id="genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
      />

      <label htmlFor="theme">Theme</label>
      <input
        className="border-black border-2 rounded p-1"
        placeholder="Describe the theme"
        type="text"
        id="theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
      />

      <label htmlFor="mood">Mood</label>
      <input
        className="border-black border-2 rounded p-1"
        placeholder="Describe the mood"
        type="text"
        id="mood"
        value={mood}
        onChange={(event) => setMood(event.target.value)}
      />

      <label htmlFor="color-scheme">Color Scheme</label>
      <input
        className="border-black border-2 rounded p-1"
        placeholder="Which colors to use"
        type="text"
        id="color-scheme"
        value={colorScheme}
        onChange={(event) => setColorScheme(event.target.value)}
      />

      <label htmlFor="art-style">Art Style</label>
      <input
        className="border-black border-2 rounded p-1"
        placeholder="e.g. photorealistic, hand drawn"
        type="text"
        id="art-style"
        value={artStyle}
        onChange={(event) => setArtStyle(event.target.value)}
      />

      <label htmlFor="requests">Requests</label>
      <input
        className="border-black border-2 rounded p-1"
        placeholder="Any additional information"
        type="text"
        id="requests"
        value={requests}
        onChange={(event) => setRequests(event.target.value)}
      />
      <br />
      <button
        className="py-2 px-4 bg-pink-500 rounded shadow text-white"
        disabled={loading}
        type="submit"
      >
        {loading ? "Generating..." : "Generate Artwork"}
      </button>
    </form>
  );
};

export default AlbumInfoForm;
