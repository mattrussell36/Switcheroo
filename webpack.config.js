const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    dist: path.join(__dirname, 'dist'),
    src: path.join(__dirname, 'src'),
}

module.exports = {
    entry: {
        index: path.join(PATHS.src, 'index.js'),
        background: path.join(PATHS.src, 'background.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: PATHS.dist,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }
        ]
    },
    resolve: {
        alias: {
            // Only using the .vue components which means we only need the runtime build.
            'vue$': 'vue/dist/vue.runtime.esm.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(PATHS.src, 'index.html'),
            excludeChunks: [
                'background'
            ]
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(PATHS.src, 'styles'),
                to: path.join(PATHS.dist, 'styles'),
            },
            {
                from: path.join(PATHS.src, 'images'),
                to: path.join(PATHS.dist, 'images'),
            },
            {
                from: path.join(PATHS.src, 'manifest.json'),
                to: path.join(PATHS.dist, 'manifest.json'),
            }
        ]),
    ]
}
