const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.client.dev.config')
const prodConfig = require('./webpack.client.prod.config')
const utils = require('./utils')
const vueConfig = require('./vue-loader.config')
const projectRoot = path.resolve(__dirname, '../')

var config = merge(baseConfig, {
    externals: {
        'jquery': 'jQuery'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueConfig
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'robots.txt',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'favicon.ico',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'static/images/**/*',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'static/editor.md/**/*',
            to: path.join(__dirname, '../dist')
        }, {
            from: 'src/template/admin-add.html',
            to: path.join(__dirname, '../dist')
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
})

if (process.env.NODE_ENV === 'production') {
    config = merge(config, prodConfig)
} else {
    config = merge(config, devConfig)
}
module.exports = config
