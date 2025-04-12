module.exports = {

  preset: 'ts-jest/presets/js-with-babel',

  testEnvironment: "jest-environment-jsdom",
 
  transform: {

    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"

  },
 
  testRegex: "(__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|jsx?)$",

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  moduleDirectories: ["node_modules", "<rootDir>"],
 
  moduleNameMapper: {

    // CSS, SCSS, LESS dosyaları

    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",


 
    // SVG gibi statik dosyalar

    "\\.svg$": "<rootDir>/test-config/SVGStub.js",
 
    // Özel modüller

    "^@airborne/react-admin$": "<rootDir>/__mocks__/airborne-react-admin.js",

    "^froala-editor(/.*)?$": "<rootDir>/__mocks__/froala-editor.js",

    "^font-awesome/css/.*$": "identity-obj-proxy",
    "^froala-editor/css/.*$": "<rootDir>/__mocks__/styleMock.js",
    "^froala-editor/js/.*$": "<rootDir>/__mocks__/styleMock.js",
    "^font-awesome/css/.*$": "<rootDir>/__mocks__/styleMock.js",

  },
 
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
 
  transformIgnorePatterns: [

    "node_modules/(?!(swiper|ssr-window|dom7|react-admin|@amcharts|froala-editor)/)"

  ],
 
  coveragePathIgnorePatterns: [

    "node_modules",

    "test-config",

    "jest-config",

    "interfaces",

    "jestGlobalMocks.ts",

    ".module.ts",

    ".mock.ts",

    "dataprovider",

    "dataprovider.ts",

    "<rootDir>/dataProvider.ts",

    "src/dataProvider.ts"

  ],
 
  snapshotSerializers: ["<rootDir>/test-config/snapshotSerializers.js"]

};
 