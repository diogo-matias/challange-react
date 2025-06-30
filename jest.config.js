module.exports = {
    preset: 'react-native',
    setupFiles: ['./jest.setup.js'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@testing-library|expo(nent)?|@expo|react-clone-referenced-element|@unimodules|unimodules|sentry-expo|native-base)"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };