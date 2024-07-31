module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/services(.*)$': '<rootDir>/src/services$1',
    '^@types(.*)$': '<rootDir>/src/types$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
