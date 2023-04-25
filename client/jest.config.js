module.exports = {
    clearMocks: true,
    preset: 'ts-jest/presets/js-with-ts',
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: "jest-environment-jsdom",
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json',
                isolatedModules: true
            }
        ]
    },
    transformIgnorePatterns: ["node_modules/(?!axios)"],
};
