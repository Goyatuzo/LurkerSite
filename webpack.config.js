/// <binding AfterBuild='Run - Development' />

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const distFolder = path.join(__dirname, '/web/static/dist');

module.exports = [
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