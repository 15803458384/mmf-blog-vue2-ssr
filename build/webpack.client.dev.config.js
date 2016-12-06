const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool: '#source-map',
    module: {
        rules: [{
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor"]
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'vendor', 'app',
            ],
            filename: 'server.html',
            template: 'src/template/server.html',
            inject: true,
        }),
        new HtmlWebpackPlugin({
            chunks: [
                'vendor', 'admin',
            ],
            filename: 'admin.html',
            template: 'src/template/admin.html',
            inject: true,
        })
    ]
}
