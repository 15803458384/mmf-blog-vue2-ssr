const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const projectRoot = path.resolve(__dirname, '../')

module.exports = {
    devtool: '#source-map',
    entry: {
        app: './src/client-entry.js',
        admin: './src/admin.js',
        vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'static/js/[name].[chunkhash:7].js'
    },
    resolve: {
        extensions: [
            '.js', '.vue'
        ],
        modules: [
            path.join(__dirname, '../node_modules')
        ],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules')
        ]
    },
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
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    }
}
