import { Configuration } from "webpack";
import * as path from "path";
import * as SLSW from "serverless-webpack";
import * as PnpWebpackPlugin from "pnp-webpack-plugin";

/**
 * Produces the webpack config object shared between lambdas
 * @param {*} context The base directory, an absolute path, for resolving entry points and loaders from the configuration.
 * @param {*} slsw serverless-webpack plugin scoped to the context of its usage
 * @returns webpack config object
 */
function getWebpackConfig(context: string, slsw: typeof SLSW): Configuration {
  // console.log({ context, lib: slsw.lib });

  return {
    context,
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    entry: slsw.lib.entries,
    devtool: slsw.lib.webpack.isLocal
      ? "eval-cheap-module-source-map"
      : "source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".json", ".mjs", ".js"],
      symlinks: false,
      cacheWithContext: false,
      plugins: [PnpWebpackPlugin],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    output: {
      libraryTarget: "commonjs",
      path: path.join(context, ".webpack"),
      filename: "[name].js",
    },
    optimization: {
      concatenateModules: false,
    },
    target: "node",
    module: {
      rules: [
        {
          test: /\.(tsx?)$/,
          loader: "esbuild-loader",
          exclude: [
            [
              path.resolve(context, "node_modules"),
              path.resolve(context, ".serverless"),
              path.resolve(context, ".webpack"),
            ],
          ],
          options: {
            loader: "ts",
            target: "es2020",
          },
        },
      ],
    },
    plugins: [],
  };
}

export default getWebpackConfig;
