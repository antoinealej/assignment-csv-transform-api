module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node", "cjs", "csv"],
  modulePathIgnorePatterns: ["build", "/node_modules/"],
  coveragePathIgnorePatterns: ["build", "/node_modules/"],
};
