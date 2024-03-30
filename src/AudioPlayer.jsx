import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";

// Icons
import backwardIcon from "./assets/Previous.svg";
import forwardIcon from "./assets/Next.svg";
import pauseIcon from "./assets/Pause.svg";
import playIcon from "./assets/Play.svg";
import loopEnabledIcon from "./assets/Loop-Disabled.svg";
import loopDisabledIcon from "./assets/Loop.svg";
import shuffleDisabledIcon from "./assets/Shuffle.svg";
import shuffleEnabledIcon from "./assets/Shuffle-Enabled.svg";
import volumeIcon100 from "./assets/Volume100.svg";
import volumeIcon50 from "./assets/Volume50.svg";
import volumeIcon20 from "./assets/Volume20.svg";
import muteIcon from "./assets/Mute.svg";
import forwardTen from "./assets/Forward-10.svg";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function AudioPlayer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Callback to handle time update
  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  // Callback to handle loaded metadata
  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current.duration);
  }, []);

  // Callback to handle track end
  const handleTrackEnded = useCallback(() => {
    if (shuffle) {
      let newIndex = currentTrackIndex;
      while (newIndex === currentTrackIndex) {
        newIndex = Math.floor(Math.random() * audioSrc.length);
      }
      setCurrentTrackIndex(newIndex);
    } else {
      let newIndex = currentTrackIndex + 1;
      if (newIndex >= audioSrc.length) {
        newIndex = 0;
      }
      setCurrentTrackIndex(newIndex);
      setIsPlaying(false);
    }
  }, [shuffle, currentTrackIndex, audioSrc]);

  useEffect(() => {
    // Set up event listeners
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleTrackEnded);

    return () => {
      // Clean up event listeners
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleTrackEnded);
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleTrackEnded]);

  useEffect(() => {
    // Load audio when current track index or audio source changes
    if (audioSrc && audioSrc.length > 0) {
      audioRef.current.load();
    }
  }, [currentTrackIndex, audioSrc]);

  useEffect(() => {
    // Play or pause audio based on isPlaying state
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Auto play when track changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlayPause = () => {
    // Toggle play/pause state
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleVolumeChange = (value) => {
    // Set volume
    setVolume(value);
    audioRef.current.volume = value;
  };

  const handleVolumeClick = () => {
    // Cycle through volume levels
    if (volume === 1) {
      handleVolumeChange(0.5);
    } else if (volume === 0.5) {
      handleVolumeChange(0.2);
    } else if (volume === 0.2) {
      handleVolumeChange(0);
    } else {
      handleVolumeChange(1);
    }
  };

  const handleNextSong = () => {
    // Play the next song
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= audioSrc.length) {
      newIndex = 0;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true); // Start playing automatically
  };

  const handlePreviousSong = () => {
    // Play the previous song
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) {
      newIndex = audioSrc.length - 1;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true); // Start playing automatically
  };

  const handleLoopToggle = () => {
    // Toggle loop mode
    setLoop((prevLoop) => !prevLoop);
  };

  const handleShuffleToggle = () => {
    // Toggle shuffle mode
    if (!shuffle) {
      const newIndex = Math.floor(Math.random() * audioSrc.length);
      setCurrentTrackIndex(newIndex);
    }
    setShuffle((prevShuffle) => !prevShuffle);
  };

  const handleSkipForward = () => {
    // Skip forward 10 seconds
    audioRef.current.currentTime += 10;
  };

  const handleProgressBarClick = (e) => {
    // Seek to clicked position on progress bar
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newTime = (percentage / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="custom-audio-player">
      <audio
        ref={audioRef}
        src={audioSrc && audioSrc.length > 0 ? audioSrc[currentTrackIndex] : ""}
      ></audio>
      <div className="controls">
        <img
          src={
            volume === 1
              ? volumeIcon100
              : volume === 0.5
              ? volumeIcon50
              : volume === 0.2
              ? volumeIcon20
              : muteIcon
          }
          alt="Volume"
          onClick={handleVolumeClick}
        />
        <img
          src={loop ? loopDisabledIcon : loopEnabledIcon}
          alt="Loop"
          onClick={handleLoopToggle}
        />
        <img src={backwardIcon} alt="Backward" onClick={handlePreviousSong} />
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt="Play/Pause"
          onClick={togglePlayPause}
        />
        <img src={forwardIcon} alt="Forward" onClick={handleNextSong} />
        <img
          src={shuffle ? shuffleEnabledIcon : shuffleDisabledIcon}
          alt="Shuffle"
          onClick={handleShuffleToggle}
        />
        <img src={forwardTen} alt="Sleep Timer" onClick={handleSkipForward} />
      </div>
      <div className="progress-bar-container">
        <div className="progress-time">{formatTime(currentTime)}</div>
        <div
          className="progress-bar"
          onClick={handleProgressBarClick}
          ref={progressBarRef}
        >
          <div
            className="progress-audio"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="duration">{formatTime(duration)}</div>
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  audioSrc: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AudioPlayer;