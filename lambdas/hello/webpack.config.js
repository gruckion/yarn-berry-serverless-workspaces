const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal
    ? "eval-cheap-module-source-map"
    : "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".json", ".mjs", ".js"],
    symlinks: false,
    cacheWithContext: false,
    plugins: [],
  },
  optimization: {
    concatenateModules: false,
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: "ts-loader",
        exclude: [
          [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".serverless"),
            path.resolve(__dirname, ".webpack"),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
};
