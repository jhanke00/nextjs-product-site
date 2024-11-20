import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/tests/setupJest.ts'],
  verbose: true,
  passWithNoTests: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  collectCoverage: true,
  coverageProvider: 'v8',
};

export default createJestConfig(config);
