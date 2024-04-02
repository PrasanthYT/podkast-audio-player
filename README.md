# Podkast Audio Player

PodKast Audio Player is a customizable React component for playing audio files with a user-friendly interface. It provides features like play/pause, volume control, skip forward/backward, loop, shuffle, and progress tracking.

## Features

- Play/pause audio
- Adjust volume
- Skip forward/backward
- Loop and shuffle modes
- Progress tracking
- Customizable color theme

## Installation

You can install the Podkast Audio Player library via npm:

```bash
npm install podkast-audio-player
```

Or you can install via yarn

``` bash
yarn add podkast-audio-player
```

## Usage

To use the PodKast Audio Player component in your React application, simply import it and pass the necessary props:

```jsx
import React from 'react';
import AudioPlayer from 'podkast-audio-player';

function MyComponent() {
  // Define your array of audio data
  const audioData = [
    {
      audioSrc: 'path/to/audio1.mp3',
      title1: 'Title 1',
      title2: 'Artist 1',
      coverpic: 'path/to/cover1.jpg'
    },
    {
      audioSrc: 'path/to/audio2.mp3',
      title1: 'Title 2',
      title2: 'Artist 2',
      coverpic: 'path/to/cover2.jpg'
    },
    // Add more audio objects as needed
  ];

  return (
    <div>
      <AudioPlayer songs={audioData} theme="light" />
    </div>
  );
}

export default MyComponent;
```

## Props

- **songs (required):** An array of objects representing each audio track. Each object should have the following properties:
  - **audioSrc (string):** The path to the audio file.
  - **title1 (string):** The main title or name of the audio track.
  - **title2 (string):** Additional information about the audio track (e.g., artist name).
  - **coverpic (string):** The path to the cover image associated with the audio track.
- **theme (optional):** Specifies the color theme of the player. Can be either "light" or "dark". Defaults to "light".

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

Podkast Audio Player is licensed under the MIT License.
