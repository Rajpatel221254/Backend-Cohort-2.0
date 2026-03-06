import React, { useContext, useState } from "react";
import { SongContext } from "../song.context";
import "./songcard.scss";

const SongCard = ({ song }) => {
  const { setSong } = useContext(SongContext);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlaySong = () => {
    setSong(song);
  };

  return (
    <div
      className="song-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlaySong}
      role="button"
      tabIndex="0"
      aria-label={`Play ${song.title}`}
    >
      <div className="song-card-image-wrapper">
        <img
          src={song.posterUrl}
          alt={song.title}
          className="song-card-image"
          loading="lazy"
        />
        <div className={`song-card-overlay ${isHovered ? "show" : ""}`}>
          <button className="play-button" aria-label="Play song">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
        <div className="song-card-badge">{song.mood}</div>
      </div>
      <div className="song-card-content">
        <h3 className="song-card-title">{song.title}</h3>
        <div className="song-card-meta">
          <span className="song-card-mood">{song.mood}</span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
