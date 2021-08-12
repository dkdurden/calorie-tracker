const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    },
};
