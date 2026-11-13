export default {
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/messages/(.*)$": "<rootDir>/messages/$1",
    "^@/command/(.*)$": "<rootDir>/src/command/$1",
    "^@/commands/(.*)$": "<rootDir>/src/commands/$1",
    "^@/core/(.*)$": "<rootDir>/src/core/$1",
    "^@/events/(.*)$": "<rootDir>/src/events/$1",
    "^@/libs/(.*)$": "<rootDir>/src/libs/$1",
    "^@/models/(.*)$": "<rootDir>/src/models/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
    "^@/templates/(.*)$": "<rootDir>/src/templates/$1"
  }
};
