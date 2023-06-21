module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)*(spec|test).*(ts|tsx|js)",
  ],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|png|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "&src/(.*)": "<rootDir>/src/$1",
    "&components/(.*)": "<rootDir>/src/components/$1",
  },
  modulePaths: ["<rootDir>/src/components"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
