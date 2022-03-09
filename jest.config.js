module.exports = {
  name: "Tests",
  testMatch: [
    "**/__frontEndTests__/?(*.)+(spec|test).js",
    "**/__tests__/?(*.)+(spec|test).js",
  ],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
