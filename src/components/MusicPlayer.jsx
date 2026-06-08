import React from 'react';

const MusicPlayer = () => {
  return (
    <>
      <audio id="bg-audio" src="audio/background-music.mp3" loop preload="auto"></audio>
  <div id="music-hint">click for music</div>
  <button id="music-btn" aria-label="Toggle background music">
    <svg id="icon-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
    <svg id="icon-playing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      style={{ display: "none" }}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  </button>
    </>
  );
};

export default MusicPlayer;
