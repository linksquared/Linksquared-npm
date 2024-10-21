const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/html/messages_list.html"),
          to: path.resolve(__dirname, "dist/html/messages_list.html"),
        },
      ],
    }),
  ],
};
