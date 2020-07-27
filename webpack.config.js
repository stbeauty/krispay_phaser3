const path = require('path');
const webpack = require('webpack');
const yargs = require('yargs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const config = require('config');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');
const options = yargs.alias('p', 'production').argv;
const isProduction = options.production;

const webpackConfig = {
    entry: {
        main: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        path: !isProduction
            ? path.resolve(__dirname, 'dist')
            : path.resolve(__dirname, 'dist', '[git-revision-hash]'),
        publicPath: '/',
        filename: 'main.bundle.js'
    },
    watch: false,
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new GitRevisionPlugin(),
        new webpack.DefinePlugin({
            __DEV__: !isProduction,
            __GAME_ID__:  '"' + config.get('gameId') + '"',
            _GAME_ENGINE_SERVICE_: '"' + config.get('services.gameEngine') + '"',
            _GA_TRACKING_ID_: '"' + config.get('analytics.gaTrackingId') + '"',
            _GTM_TRACKING_ID_: '"' + config.get('analytics.gtmTrackingId') + '"',
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /pixi\.js/,
                use: 'expose-loader?PIXI'
            },
            {
                test: /phaser-split\.js$/,
                use: 'expose-loader?Phaser'
            },
            {
                test: /p2\.js/,
                use: 'expose-loader?p2'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        port: config.get('port'),
        historyApiFallback: true,
        quiet: true
    }
};

if (!isProduction) {
    webpackConfig.devtool = 'inline-source-map'
}

module.exports = webpackConfig;
