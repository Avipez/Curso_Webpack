const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");
const cssMinimizer = require("css-minimizer-webpack-plugin");
const terserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    resolve: {
        extensions: [".js"],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
          }
    },
    module: {
        rules:
        [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|.styl$/,
                use: [miniCSSExtractPlugin.loader, "css-loader", "stylus-loader"],
            },
            {
                test:/\.png/,
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2)$/,
                type: "asset/resource",
                generator: {
                  filename: "assets/fonts/[name].[contenthash].[ext]"
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            inject: "body",
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new miniCSSExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new copyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new cssMinimizer(),
            new terserPlugin()
        ]
    }
}