module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/**/*.(spec|test).(ts|tsx)|**/__tests__/*.(ts|tsx)'],
}
