"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./style.css");
var _Previous = _interopRequireDefault(require("./assets/Previous.svg"));
var _Next = _interopRequireDefault(require("./assets/Next.svg"));
var _Pause = _interopRequireDefault(require("./assets/Pause.svg"));
var _Play = _interopRequireDefault(require("./assets/Play.svg"));
var _LoopDisabled = _interopRequireDefault(require("./assets/Loop-Disabled.svg"));
var _Loop = _interopRequireDefault(require("./assets/Loop.svg"));
var _Shuffle = _interopRequireDefault(require("./assets/Shuffle.svg"));
var _ShuffleEnabled = _interopRequireDefault(require("./assets/Shuffle-Enabled.svg"));
var _Volume = _interopRequireDefault(require("./assets/Volume100.svg"));
var _Volume2 = _interopRequireDefault(require("./assets/Volume50.svg"));
var _Volume3 = _interopRequireDefault(require("./assets/Volume20.svg"));
var _Mute = _interopRequireDefault(require("./assets/Mute.svg"));
var _Forward = _interopRequireDefault(require("./assets/Forward-10.svg"));
var _PreviousDark = _interopRequireDefault(require("./assets/Previous-Dark.svg"));
var _NextDark = _interopRequireDefault(require("./assets/Next-Dark.svg"));
var _PauseDark = _interopRequireDefault(require("./assets/Pause-Dark.svg"));
var _PlayDark = _interopRequireDefault(require("./assets/Play-Dark.svg"));
var _LoopDisabledDark = _interopRequireDefault(require("./assets/Loop-Disabled-Dark.svg"));
var _LoopDark = _interopRequireDefault(require("./assets/Loop-Dark.svg"));
var _ShuffleDark = _interopRequireDefault(require("./assets/Shuffle-Dark.svg"));
var _ShuffleEnabledDark = _interopRequireDefault(require("./assets/Shuffle-Enabled-Dark.svg"));
var _Volume100Dark = _interopRequireDefault(require("./assets/Volume100-Dark.svg"));
var _Volume50Dark = _interopRequireDefault(require("./assets/Volume50-Dark.svg"));
var _Volume20Dark = _interopRequireDefault(require("./assets/Volume20-Dark.svg"));
var _MuteDark = _interopRequireDefault(require("./assets/Mute-Dark.svg"));
var _Forward10Dark = _interopRequireDefault(require("./assets/Forward-10-Dark.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // Icons
// Light Theme
// Dark Theme
function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor(seconds % 3600 / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return "".concat(hours.toString().padStart(2, "0"), ":").concat(minutes.toString().padStart(2, "0"), ":").concat(remainingSeconds.toString().padStart(2, "0"));
}
function AudioPlayer(_ref) {
  var songs = _ref.songs,
    theme = _ref.theme;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isPlaying = _useState2[0],
    setIsPlaying = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    currentTime = _useState4[0],
    setCurrentTime = _useState4[1];
  var _useState5 = (0, _react.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    duration = _useState6[0],
    setDuration = _useState6[1];
  var _useState7 = (0, _react.useState)(1),
    _useState8 = _slicedToArray(_useState7, 2),
    volume = _useState8[0],
    setVolume = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    currentTrackIndex = _useState10[0],
    setCurrentTrackIndex = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    loop = _useState12[0],
    setLoop = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    shuffle = _useState14[0],
    setShuffle = _useState14[1];
  var audioRef = (0, _react.useRef)(null);
  var progressBarRef = (0, _react.useRef)(null);
  var icons = {
    light: {
      backward: _Previous["default"],
      forward: _Next["default"],
      pause: _Pause["default"],
      play: _Play["default"],
      loopEnabled: _LoopDisabled["default"],
      loopDisabled: _Loop["default"],
      shuffleEnabled: _ShuffleEnabled["default"],
      shuffleDisabled: _Shuffle["default"],
      volume100: _Volume["default"],
      volume50: _Volume2["default"],
      volume20: _Volume3["default"],
      mute: _Mute["default"],
      forwardTen: _Forward["default"]
    },
    dark: {
      backward: _PreviousDark["default"],
      forward: _NextDark["default"],
      pause: _PauseDark["default"],
      play: _PlayDark["default"],
      loopEnabled: _LoopDisabledDark["default"],
      loopDisabled: _LoopDark["default"],
      shuffleEnabled: _ShuffleEnabledDark["default"],
      shuffleDisabled: _ShuffleDark["default"],
      volume100: _Volume100Dark["default"],
      volume50: _Volume50Dark["default"],
      volume20: _Volume20Dark["default"],
      mute: _MuteDark["default"],
      forwardTen: _Forward10Dark["default"]
    }
  };
  var currentSong = songs[currentTrackIndex];

  // Callbacks
  var handleTimeUpdate = (0, _react.useCallback)(function () {
    console.log("Time updated");
    setCurrentTime(audioRef.current.currentTime);
  }, []);
  var handleLoadedMetadata = (0, _react.useCallback)(function () {
    setDuration(audioRef.current.duration);
    setIsPlaying(true); // Start playing the audio
  }, []);
  var handleTrackEnded = (0, _react.useCallback)(function () {
    console.log("Track ended");
    if (shuffle) {
      var newIndex = currentTrackIndex;
      while (newIndex === currentTrackIndex) {
        newIndex = Math.floor(Math.random() * songs.length);
      }
      setCurrentTrackIndex(newIndex);
    } else {
      var _newIndex = currentTrackIndex + 1;
      if (_newIndex >= songs.length) {
        _newIndex = 0;
      }
      setCurrentTrackIndex(_newIndex);
      setIsPlaying(false);
    }
  }, [shuffle, currentTrackIndex, songs]);

  // Effects
  (0, _react.useEffect)(function () {
    var audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleTrackEnded);
    }
    return function () {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleTrackEnded);
      }
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleTrackEnded]);
  (0, _react.useEffect)(function () {
    if (songs && songs.length > 0) {
      audioRef.current.load();
    }
  }, [currentTrackIndex, songs]);
  (0, _react.useEffect)(function () {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  (0, _react.useEffect)(function () {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  // Handlers
  var togglePlayPause = (0, _react.useCallback)(function () {
    setIsPlaying(function (prevIsPlaying) {
      return !prevIsPlaying;
    });
  }, []);
  var handleVolumeChange = (0, _react.useCallback)(function (value) {
    setVolume(value);
    audioRef.current.volume = value;
  }, []);
  var handleVolumeClick = (0, _react.useCallback)(function () {
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
  var handleNextSong = (0, _react.useCallback)(function () {
    var newIndex = currentTrackIndex + 1;
    if (newIndex >= songs.length) {
      newIndex = 0;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  }, [currentTrackIndex, songs]);
  var handlePreviousSong = (0, _react.useCallback)(function () {
    var newIndex = currentTrackIndex - 1;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  }, [currentTrackIndex, songs]);
  var handleLoopToggle = (0, _react.useCallback)(function () {
    setLoop(function (prevLoop) {
      return !prevLoop;
    });
  }, []);
  var handleShuffleToggle = (0, _react.useCallback)(function () {
    if (!shuffle) {
      var newIndex = Math.floor(Math.random() * songs.length);
      setCurrentTrackIndex(newIndex);
    }
    setShuffle(function (prevShuffle) {
      return !prevShuffle;
    });
  }, [shuffle, songs]);
  var handleSkipForward = (0, _react.useCallback)(function () {
    audioRef.current.currentTime += 10;
  }, []);
  var handleProgressBarClick = (0, _react.useCallback)(function (e) {
    var rect = progressBarRef.current.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var percentage = x / rect.width * 100;
    var newTime = percentage / 100 * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "card"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "top"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "pfp",
    style: {
      backgroundImage: "url(".concat(currentSong.coverpic, ")")
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "playing"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "greenline line-1"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "greenline line-2"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "greenline line-3"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "greenline line-4"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "greenline line-5"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "texts"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "title-1"
  }, currentSong.title1), /*#__PURE__*/_react["default"].createElement("p", {
    className: "title-2"
  }, currentSong.title2)), /*#__PURE__*/_react["default"].createElement("audio", {
    ref: audioRef,
    src: currentSong.audioSrc
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "controls"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "controllers"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "podkast-audio-player-left-controllers"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: volume === 1 ? icons[theme].volume100 : volume === 0.5 ? icons[theme].volume50 : volume === 0.2 ? icons[theme].volume20 : icons[theme].mute,
    alt: "Volume",
    onClick: handleVolumeClick
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: icons[theme].forwardTen,
    alt: "Forward Ten",
    onClick: handleSkipForward
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "podkast-audio-player-main-controllers"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: icons[theme].backward,
    alt: "Backward",
    onClick: handlePreviousSong
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: isPlaying ? icons[theme].pause : icons[theme].play,
    alt: "Play/Pause",
    onClick: togglePlayPause,
    className: "play-button"
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: icons[theme].forward,
    alt: "Forward",
    onClick: handleNextSong
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "podkast-audio-player-right-controllers"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: loop ? icons[theme].loopDisabled : icons[theme].loopEnabled,
    alt: "Loop",
    onClick: handleLoopToggle
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: shuffle ? icons[theme].shuffleEnabled : icons[theme].shuffleDisabled,
    alt: "Shuffle",
    onClick: handleShuffleToggle
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "time",
    ref: progressBarRef,
    onClick: handleProgressBarClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "elapsed",
    style: {
      width: "".concat(currentTime / duration * 100, "%")
    }
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: "timetext time_now"
  }, formatTime(currentTime)), /*#__PURE__*/_react["default"].createElement("p", {
    className: "timetext time_full"
  }, formatTime(duration)));
}
AudioPlayer.propTypes = {
  songs: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    audioSrc: _propTypes["default"].string.isRequired,
    title1: _propTypes["default"].string.isRequired,
    title2: _propTypes["default"].string.isRequired,
    coverpic: _propTypes["default"].string.isRequired
  })).isRequired,
  theme: _propTypes["default"].oneOf(["light", "dark"]).isRequired
};
var _default = exports["default"] = AudioPlayer;