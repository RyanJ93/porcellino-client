'use strict';

const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: ['./index.tsx']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(scss|css)$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        }
                    }

                },
                { loader: 'sass-loader' },
                { loader: 'thread-loader' }
            ]
        }]
    },
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: { output: { ascii_only: true } },
            parallel: true
        })]
    },
    plugins: [
        new WebpackNotifierPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: { hot: true }
};
