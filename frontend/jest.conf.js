module.exports = {
  moduleFileExtensions: ["js", "ts", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testRegex: "/test/.*\\.spec\\.(ts?)$",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testEnvironment: "node",
};
