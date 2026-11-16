jest.mock('expo-audio', () => ({
    useAudioPlayer: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        seekTo: jest.fn(),
        playing: false,
    })),
    setAudioModeAsync: jest.fn(),
}));