const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './'
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/nice-working/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1'
    },
    testEnvironment: 'jest-environment-jsdom'
}

module.exports = createJestConfig(customJestConfig)
