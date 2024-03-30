# Podkast Audio Player

PYBNJUHJBV odkast Audio Player is a lightweight and customizable audio player library designed specifically for podcasting applications. With seamless integration into React projects, it provides a range of features to enhance the podcast listening experience.

## Features

- **Customizable Controls:** Intuitive controls for play/pause, volume adjustment, looping, shuffling, and skipping forward.
- **Responsive Design:** Adapts gracefully to various screen sizes, ensuring a consistent user experience across devices.
- **Track Progress Bar:** Visual progress bar displays the current playback position within the audio track for seamless navigation.
- **Auto-Play Functionality:** Automatically starts playing the next track in the playlist when the current track ends.
- **Shuffle Mode:** Enables shuffling the playback order of podcast episodes for added variety.
- **Volume Control:** Allows users to adjust volume level with support for muting and incremental volume changes.

## Installation

You can install the Podkast Audio Player library via npm:

```bash
npm install podkast-audio-player
```

## Usage

```jsx
import React from 'react';
import AudioPlayer from 'podkast-audio-player';

const audioSrc = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3'];

function App() {
  return (
    <div>
      <AudioPlayer audioSrc={audioSrc} />
    </div>
  );
}

export default App;
```

## Props
- **audioSrc:** An array of strings representing the URLs or paths to the audio files.

## Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

## License
Podkast Audio Player is licensed under the MIT License.