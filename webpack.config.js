/// <binding AfterBuild='Run - Development' />

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distFolder = path.join(__dirname, '/web/static/dist');

module.exports = [
    {
        mode: "development",
        entry: {
            "home": './web/static/js/home/index.ts',
            "user-time": './web/static/js/user/user-time.ts',
            "live-feed": './web/static/js/user/live-feed.tsx'
        },
        output: {
            filename: '[name]-bundle.js',
            path: distFolder
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise'
            })
        ],
    },
    {
        entry: {
            main: './web/static/css/main.scss'
        },
        mode: "development",
        output: {
            filename: '[name]-css.js',
            path: distFolder
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(scss)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // Output extracted CSS to a file
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ]
    }
]