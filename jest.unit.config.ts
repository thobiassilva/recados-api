import jestConfig from "./jest.config";

const config = { ...jestConfig, testMatch: ["**/*.spec.ts"] };

export default config;
