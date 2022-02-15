import jestConfig from "./jest.config";

const config = { ...jestConfig, testMatch: ["**/*.test.ts"] };

export default config;
