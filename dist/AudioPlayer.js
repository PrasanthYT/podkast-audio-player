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
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // Icons
function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor(seconds % 3600 / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return "".concat(hours.toString().padStart(2, "0"), ":").concat(minutes.toString().padStart(2, "0"), ":").concat(remainingSeconds.toString().padStart(2, "0"));
}
function AudioPlayer(_ref) {
  var audioSrc = _ref.audioSrc;
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

  // Callback to handle time update
  var handleTimeUpdate = (0, _react.useCallback)(function () {
    setCurrentTime(audioRef.current.currentTime);
  }, []);

  // Callback to handle loaded metadata
  var handleLoadedMetadata = (0, _react.useCallback)(function () {
    setDuration(audioRef.current.duration);
  }, []);

  // Callback to handle track end
  var handleTrackEnded = (0, _react.useCallback)(function () {
    if (shuffle) {
      var newIndex = currentTrackIndex;
      while (newIndex === currentTrackIndex) {
        newIndex = Math.floor(Math.random() * audioSrc.length);
      }
      setCurrentTrackIndex(newIndex);
    } else {
      var _newIndex = currentTrackIndex + 1;
      if (_newIndex >= audioSrc.length) {
        _newIndex = 0;
      }
      setCurrentTrackIndex(_newIndex);
      setIsPlaying(false);
    }
  }, [shuffle, currentTrackIndex, audioSrc]);
  (0, _react.useEffect)(function () {
    // Set up event listeners
    var audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleTrackEnded);
    return function () {
      // Clean up event listeners
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleTrackEnded);
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleTrackEnded]);
  (0, _react.useEffect)(function () {
    // Load audio when current track index or audio source changes
    if (audioSrc && audioSrc.length > 0) {
      audioRef.current.load();
    }
  }, [currentTrackIndex, audioSrc]);
  (0, _react.useEffect)(function () {
    // Play or pause audio based on isPlaying state
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Auto play when track changes
  (0, _react.useEffect)(function () {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);
  var togglePlayPause = function togglePlayPause() {
    // Toggle play/pause state
    setIsPlaying(function (prevIsPlaying) {
      return !prevIsPlaying;
    });
  };
  var handleVolumeChange = function handleVolumeChange(value) {
    // Set volume
    setVolume(value);
    audioRef.current.volume = value;
  };
  var handleVolumeClick = function handleVolumeClick() {
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
  var handleNextSong = function handleNextSong() {
    // Play the next song
    var newIndex = currentTrackIndex + 1;
    if (newIndex >= audioSrc.length) {
      newIndex = 0;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true); // Start playing automatically
  };
  var handlePreviousSong = function handlePreviousSong() {
    // Play the previous song
    var newIndex = currentTrackIndex - 1;
    if (newIndex < 0) {
      newIndex = audioSrc.length - 1;
    }
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true); // Start playing automatically
  };
  var handleLoopToggle = function handleLoopToggle() {
    // Toggle loop mode
    setLoop(function (prevLoop) {
      return !prevLoop;
    });
  };
  var handleShuffleToggle = function handleShuffleToggle() {
    // Toggle shuffle mode
    if (!shuffle) {
      var newIndex = Math.floor(Math.random() * audioSrc.length);
      setCurrentTrackIndex(newIndex);
    }
    setShuffle(function (prevShuffle) {
      return !prevShuffle;
    });
  };
  var handleSkipForward = function handleSkipForward() {
    // Skip forward 10 seconds
    audioRef.current.currentTime += 10;
  };
  var handleProgressBarClick = function handleProgressBarClick(e) {
    // Seek to clicked position on progress bar
    var rect = progressBarRef.current.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var percentage = x / rect.width * 100;
    var newTime = percentage / 100 * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "custom-audio-player"
  }, /*#__PURE__*/_react["default"].createElement("audio", {
    ref: audioRef,
    src: audioSrc && audioSrc.length > 0 ? audioSrc[currentTrackIndex] : ""
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "controls"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: volume === 1 ? _Volume["default"] : volume === 0.5 ? _Volume2["default"] : volume === 0.2 ? _Volume3["default"] : _Mute["default"],
    alt: "Volume",
    onClick: handleVolumeClick
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: loop ? _Loop["default"] : _LoopDisabled["default"],
    alt: "Loop",
    onClick: handleLoopToggle
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: _Previous["default"],
    alt: "Backward",
    onClick: handlePreviousSong
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: isPlaying ? _Pause["default"] : _Play["default"],
    alt: "Play/Pause",
    onClick: togglePlayPause
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: _Next["default"],
    alt: "Forward",
    onClick: handleNextSong
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: shuffle ? _ShuffleEnabled["default"] : _Shuffle["default"],
    alt: "Shuffle",
    onClick: handleShuffleToggle
  }), /*#__PURE__*/_react["default"].createElement("img", {
    src: _Forward["default"],
    alt: "Sleep Timer",
    onClick: handleSkipForward
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "progress-bar-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "progress-time"
  }, formatTime(currentTime)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "progress-bar",
    onClick: handleProgressBarClick,
    ref: progressBarRef
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "progress-audio",
    style: {
      width: "".concat(currentTime / duration * 100, "%")
    }
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "duration"
  }, formatTime(duration))));
}
AudioPlayer.propTypes = {
  audioSrc: _propTypes["default"].arrayOf(_propTypes["default"].string).isRequired
};
var _default = exports["default"] = AudioPlayer;