const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@cmp": path.resolve(__dirname, "src/components/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@layouts": path.resolve(__dirname, "src/layouts/"),
      "@lib": path.resolve(__dirname, "src/lib/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@views": path.resolve(__dirname, "src/views/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@context": path.resolve(__dirname, "src/context/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
  babel: {
    presets: [
      "@babel/preset-env",
      ["@babel/preset-react", { runtime: "automatic" }],
      "@babel/preset-typescript",
    ],
  },
  jest: {
    configure: {
      verbose: true,
      moduleNameMapper: {
        "^@cmp/(.*)": "<rootDir>/src/components/$1",
        "^@hooks/(.*)": "<rootDir>/src/hooks/$1",
        "^@layouts/(.*)": "<rootDir>/src/layouts/$1",
        "^@lib/(.*)": "<rootDir>/src/lib/$1",
        "^@services/(.*)": "<rootDir>/src/services/$1",
        "^@store/(.*)": "<rootDir>/src/store/$1",
        "^@views/(.*)": "<rootDir>/src/views/$1",
        "^@assets/(.*)": "<rootDir>/src/assets/$1",
        "^@context/(.*)": "<rootDir>/src/context/$1",
        "^@routes/(.*)": "<rootDir>/src/routes/$1",
        "^@constants/(.*)": "<rootDir>/src/constants/$1",
        "^@utils/(.*)": "<rootDir>/src/utils/$1",
      },
    },
  },
};
