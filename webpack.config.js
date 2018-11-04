const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const cleanP = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/JS/main.js'
    },
    output: {
        filename: './[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'compressed'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png || svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './imgz/',
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new cleanP(['dist']),
        new htmlPlugin({
            filename: './index.html',
            template: './src/index.html'
        }),
        new miniCss({
            filename: './styles.css',
            chunkFilename: '[id].css'
        })
    ]
}