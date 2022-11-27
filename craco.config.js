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
};
