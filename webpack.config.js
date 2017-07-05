/**
 * Created by vpotseluyko on 7/5/17.
 */

const webpack = require("webpack");
const path = require("path");

module.exports = {

    context: path.resolve(__dirname, './sources/'),
    entry: {
        "ugp": "./app.js",
        "ugp.min": "./app.js"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                include: [
                    path.resolve(__dirname, './sources')
                ],
                loader: "babel-loader?presets[]=es2015"
            }
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};