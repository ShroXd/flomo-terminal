module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    transform: {
        ".(ts|tsx)": "ts-jest"
    },
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/test/"
    ],
    // coverageThreshold: {
    //     "global": {
    //         "branches": 90,
    //         "functions": 90,
    //         "lines": 95,
    //         "statements": 95
    //     }
    // },
}
