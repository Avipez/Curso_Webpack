const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");
const dotEnv = require("dotenv-webpack");
const BundleAnalyzerPlugin =require("webpack-bundle-analyzer").BundleAnalyzerPlugin;;

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/images/[hash][ext][query]"
    },
    mode: "development",
    devtool: "source-map",
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
        }),
        new dotEnv(),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        historyApiFallback: true,
        port: 5050,
        open:true
    }
}