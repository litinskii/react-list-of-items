const IS_PRODUCTION = process.env.NODE_ENV === "production";
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const jsonServer = require("json-server");

module.exports = {
  entry: "./src/application/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, path.join(__dirname, "src/application/assets/")],
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          failOnWarning: false,
          failOnError: true
        }
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: IS_PRODUCTION
          ? ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                {
                  loader: "css-loader",
                  options: {
                    minimize: true
                  }
                },
                "postcss-loader",
                "sass-loader",
                {
                  loader: "sass-resources-loader",
                  options: {
                    resources: path.join(__dirname, "src/styles/resources/index.scss")
                  }
                }
              ]
            })
          : [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  importLoaders: 2
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true,
                  outputStyle: "expanded"
                }
              },
              {
                loader: "sass-resources-loader",
                options: {
                  resources: path.join(__dirname, "src/styles/resources/index.scss")
                }
              }
            ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]",
          limit: 10000,
          publicPath: IS_PRODUCTION ? "" : "/public",
          outputPath: "/assets/img/",
          useRelativePath: IS_PRODUCTION
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "index.js"
  },
  stats: !IS_PRODUCTION,
  devServer: {
    before: server => {
      server.use("/api", jsonServer.defaults());
      server.use("/api", jsonServer.bodyParser);
      server.use("/api", (req, res, next) => setTimeout(next, 500));
      server.use("/api", jsonServer.router(path.join(__dirname, "src/db.json")));
    },
    port: 3000,
    historyApiFallback: true
    // host: '0.0.0.0',
    // disableHostCheck: true,
    // headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [
    new webpack.DefinePlugin({
      DEFINE_IS_PRODUCTION: JSON.stringify(IS_PRODUCTION)
    }),
    new HtmlWebpackPlugin({
      IS_PRODUCTION,
      template: path.resolve(__dirname, "src/index.html.ejs"),
      inject: false,
      alwaysWriteToDisk: IS_PRODUCTION
    }),
    IS_PRODUCTION
      ? new HtmlWebpackHarddiskPlugin({
          outputPath: path.resolve(__dirname, "public")
        })
      : undefined,
    new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }]),
    IS_PRODUCTION ? new ExtractTextPlugin("assets/css/main.css") : undefined,
    IS_PRODUCTION ? new CleanWebpackPlugin(["public"]) : undefined
  ].filter(plugin => plugin),
  resolve: {
    modules: [path.join(__dirname, "src/application/"), path.join(__dirname, "node_modules")],
    extensions: [".js"]
  },
  devtool: IS_PRODUCTION ? false : "eval-cheap-module-source-map"
};
