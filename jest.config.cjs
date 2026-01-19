const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@app-types/(.*)$': '<rootDir>/src/types/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!i18next)/'],
}

module.exports = createJestConfig(customJestConfig)
