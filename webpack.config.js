const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require("dotenv-webpack");
const isDevelopment = process.env.NODE_ENV !== 'production';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require("webpack");
const config = {
    mode: isDevelopment,
    entry: {
        main: path.join(__dirname, "src", "index.js"),
    },
    devServer: {
        hot: true,
        liveReload: false,
        open: ['/'],
        static: {
            publicPath: '/',
        }
    },
    resolve: {
        fallback: {
            "fs": false,
            "os": false,
            "path": false,
        },
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, "dist", ""),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env',
                            ["@babel/preset-react", {"runtime": "automatic"}]],
                        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    plugins: [
        new Dotenv({systemvars: true, path: './.env'}),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            excludeChunks: ['components'],
            templateParameters: () => {
                require('dotenv').config()

                return process.env;
            }
        }),
        isDevelopment && new ReactRefreshWebpackPlugin({
            exclude: [/node_modules/]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    to: "assets",
                    from: "src/assets"
                }
            ]
        }),
    ].filter(Boolean),

    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: 'single'
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}
if (isDevelopment) {
    config.devtool = 'inline-source-map';
}

module.exports = config