const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "Linksquared.js",
    library: "Linksquared",
    libraryTarget: "umd",
    publicPath: "/dist/", // Required for webpack-dev-server
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
