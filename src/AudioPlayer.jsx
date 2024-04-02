import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";

// Icons
// Light Theme
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

// Dark Theme
import backwardIconDark from "./assets/Previous-Dark.svg";
import forwardIconDark from "./assets/Next-Dark.svg";
import pauseIconDark from "./assets/Pause-Dark.svg";
import playIconDark from "./assets/Play-Dark.svg";
import loopEnabledIconDark from "./assets/Loop-Disabled-Dark.svg";
import loopDisabledIconDark from "./assets/Loop-Dark.svg";
import shuffleDisabledIconDark from "./assets/Shuffle-Dark.svg";
import shuffleEnabledIconDark from "./assets/Shuffle-Enabled-Dark.svg";
import volumeIcon100Dark from "./assets/Volume100-Dark.svg";
import volumeIcon50Dark from "./assets/Volume50-Dark.svg";
import volumeIcon20Dark from "./assets/Volume20-Dark.svg";
import muteIconDark from "./assets/Mute-Dark.svg";
import forwardTenDark from "./assets/Forward-10-Dark.svg";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function AudioPlayer({ songs, theme }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const icons = {
    light: {
      backward: backwardIcon,
      forward: forwardIcon,
      pause: pauseIcon,
      play: playIcon,
      loopEnabled: loopEnabledIcon,
      loopDisabled: loopDisabledIcon,
      shuffleEnabled: shuffleEnabledIcon,
      shuffleDisabled: shuffleDisabledIcon,
      volume100: volumeIcon100,
      volume50: volumeIcon50,
      volume20: volumeIcon20,
      mute: muteIcon,
      forwardTen: forwardTen,
    },
    dark: {
      backward: backwardIconDark,
      forward: forwardIconDark,
      pause: pauseIconDark,
      play: playIconDark,
      loopEnabled: loopEnabledIconDark,
      loopDisabled: loopDisabledIconDark,
      shuffleEnabled: shuffleEnabledIconDark,
      shuffleDisabled: shuffleDisabledIconDark,
      volume100: volumeIcon100Dark,
      volume50: volumeIcon50Dark,
      volume20: volumeIcon20Dark,
      mute: muteIconDark,
      forwardTen: forwardTenDark,
    },
  };

  const currentSong = songs[currentTrackIndex];

  // Callbacks
  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current.duration);
    setIsPlaying(true); // Start playing the audio
  }, []);

  const handleTrackEnded = useCallback(() => {
    console.log("Track ended");
    if (shuffle) {
      let newIndex = currentTrackIndex;
      while (newIndex === currentTrackIndex) {
        newIndex = Math.floor(Math.random() * songs.length);
      }
      setCurrentTrackIndex(newIndex);
    } else {
      let newIndex = currentTrackIndex + 1;
      if (newIndex >= songs.length) {
        newIndex = 0;
      }
      setCurrentTrackIndex(newIndex);
      setIsPlaying(false);
    }
  }, [shuffle, currentTrackIndex, songs]);

  // Effects
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleTrackEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleTrackEnded);
      }
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleTrackEnded]);

  useEffect(() => {
    if (songs && songs.length > 0) {
      audioRef.current.load();
    }
  }, [currentTrackIndex, songs]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  // Handlers
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  }, []);

  const handleVolumeChange = useCallback((value) => {
    setVolume(value);
    audioRef.current.volume = value;
  }, []);

  const handleVolumeClick = useCallback(() => {
    if (volume === 1) {
      handleVolumeChange(0.5);
    } else if (volume === 0.5) {
      handleVolumeChange(0.2);
    } else if (volume === 0.2) {
      handleVolumeChange(0);
    } else {
      handleVolumeChange(1);
    }
  }, [handleVolumeChange, volume]);

  const handleNextSong = useCallback(() => {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= songs.length) {
      newIndex = 0;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  }, [currentTrackIndex, songs]);

  const handlePreviousSong = useCallback(() => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  }, [currentTrackIndex, songs]);

  const handleLoopToggle = useCallback(() => {
    setLoop((prevLoop) => !prevLoop);
  }, []);

  const handleShuffleToggle = useCallback(() => {
    if (!shuffle) {
      const newIndex = Math.floor(Math.random() * songs.length);
      setCurrentTrackIndex(newIndex);
    }
    setShuffle((prevShuffle) => !prevShuffle);
  }, [shuffle, songs]);

  const handleSkipForward = useCallback(() => {
    audioRef.current.currentTime += 10;
  }, []);

  const handleProgressBarClick = useCallback(
    (e) => {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration]
  );

  return (
    <div className="card">
      <div className="top">
        <div
          className="pfp"
          style={{ backgroundImage: `url(${currentSong.coverpic})` }}
        >
          <div className="playing">
            <div className="greenline line-1"></div>
            <div className="greenline line-2"></div>
            <div className="greenline line-3"></div>
            <div className="greenline line-4"></div>
            <div className="greenline line-5"></div>
          </div>
        </div>
        <div className="texts">
          <p className="title-1">{currentSong.title1}</p>
          <p className="title-2">{currentSong.title2}</p>
        </div>
        <audio ref={audioRef} src={currentSong.audioSrc}></audio>
      </div>

      <div className="controls">
        <div className="controllers">
          <div className="podkast-audio-player-left-controllers">
            <img
              src={
                volume === 1
                  ? icons[theme].volume100
                  : volume === 0.5
                  ? icons[theme].volume50
                  : volume === 0.2
                  ? icons[theme].volume20
                  : icons[theme].mute
              }
              alt="Volume"
              onClick={handleVolumeClick}
            />
            <img
              src={icons[theme].forwardTen}
              alt="Forward Ten"
              onClick={handleSkipForward}
            />
          </div>
          <div className="podkast-audio-player-main-controllers">
            <img
              src={icons[theme].backward}
              alt="Backward"
              onClick={handlePreviousSong}
            />
            <img
              src={isPlaying ? icons[theme].pause : icons[theme].play}
              alt="Play/Pause"
              onClick={togglePlayPause}
              className="play-button"
            />
            <img
              src={icons[theme].forward}
              alt="Forward"
              onClick={handleNextSong}
            />
          </div>
          <div className="podkast-audio-player-right-controllers">
            <img
              src={loop ? icons[theme].loopDisabled : icons[theme].loopEnabled}
              alt="Loop"
              onClick={handleLoopToggle}
            />
            <img
              src={
                shuffle
                  ? icons[theme].shuffleEnabled
                  : icons[theme].shuffleDisabled
              }
              alt="Shuffle"
              onClick={handleShuffleToggle}
            />
          </div>
        </div>
      </div>

      <div
        className="time"
        ref={progressBarRef}
        onClick={handleProgressBarClick}
      >
        <div
          className="elapsed"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
      </div>
      <p className="timetext time_now">{formatTime(currentTime)}</p>
      <p className="timetext time_full">{formatTime(duration)}</p>
    </div>
  );
}

AudioPlayer.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      audioSrc: PropTypes.string.isRequired,
      title1: PropTypes.string.isRequired,
      title2: PropTypes.string.isRequired,
      coverpic: PropTypes.string.isRequired,
    })
  ).isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
};

export default AudioPlayer;