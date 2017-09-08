const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PATHS = {
    dist: path.join(__dirname, 'dist'),
    src: path.join(__dirname, 'src'),
}

module.exports = {
    entry: {
        index: './src/index.js',
        background: './src/background.js',
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
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'es2015'
                            ]
                        }
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
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
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
                to: path.join(PATHS.dist, 'images')
            }
        ]),
        new ManifestPlugin({
            seed: require('./src/manifest.json'),
        }),
    ]
}
