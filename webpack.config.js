/// <binding AfterBuild='Run - Development' />

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distFolder = path.join(__dirname, '/web/static/dist');

module.exports = [
    {
        mode: "development",
        entry: {
            "home": './js/home/index.ts',
            "stats": './js/stats/index.tsx',
            "user-time": './js/user/user-time.ts',
            "live-feed": './js/user/live-feed.tsx',
            "game-graphs": './js/game/graphs.tsx',
            "user-graphs": "./js/apps/user-game-summary.tsx"
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
            main: './css/main.scss'
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