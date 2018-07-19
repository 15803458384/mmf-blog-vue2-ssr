const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const WebpackBar = require('webpackbar')

const config = require('../config')
const isProd = process.env.NODE_ENV === 'production'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const jsLoader = [
    {
        loader: 'cache-loader',
        options: {
            cacheDirectory: path.join(__dirname, '../node_modules/.cache/babel-loader'),
            cacheIdentifier: process.env.NODE_ENV + '_babel'
        }
    }
]
if (isProd) {
    jsLoader.push({
        loader: 'thread-loader'
    })
}
jsLoader.push({
    loader: 'babel-loader'
})

const baseConfig = {
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js')
        }
    },
    entry: {
        app: './src/entry-client.js',
        admin: './src/admin.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [path.join(__dirname, '../node_modules')],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~api': path.resolve(__dirname, '../src/api/index-client'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~mixins': path.resolve(__dirname, '../src/mixins'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~utils': path.resolve(__dirname, '../src/utils'),
            assets: path.resolve(__dirname, '../src/assets'),
            'api-config': path.resolve(__dirname, '../src/api/config-client')
        }
    },
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.join(__dirname, '../node_modules/.cache/vue-loader'),
                            cacheIdentifier: process.env.NODE_ENV + '_vue'
                        }
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: true
                            },
                            cacheDirectory: path.join(__dirname, '../node_modules/.cache/vue-loader'),
                            cacheIdentifier: process.env.NODE_ENV + '_vue'
                        }
                    }
                ],
                include: [resolve('src')]
            },
            {
                test: /\.jsx?$/,
                use: jsLoader,
                include: [resolve('src')],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProd ? 'static/img/[name].[hash:7].[ext]' : '[name].[hash:7].[ext]',
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new VueLoaderPlugin(),
        new WebpackBar()
    ]
}
!isProd && baseConfig.plugins.push(new FriendlyErrorsPlugin())
module.exports = baseConfig
