jest.mock('expo-audio', () => ({
    useAudioPlayer: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        seekTo: jest.fn(),
    })),
    useAudioPlayerStatus: jest.fn(() => ({
        playing: false,
        currentTime: 0,
        duration: 60,
    })),
    setAudioModeAsync: jest.fn(() => Promise.resolve()),
}));