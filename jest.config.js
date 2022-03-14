module.exports = {
  name: 'Tests',
  testMatch: [
    '**/__frontEndTests__/?(*.)+(spec|test).js',
    '**/__tests__/?(*.)+(spec|test).js',
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/admin/src/__mocks__/styleMock.js',
  },
};
