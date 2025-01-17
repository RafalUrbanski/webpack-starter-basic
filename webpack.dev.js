const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        index: ["@babel/polyfill/noConflict", './dev/index.ts']
    },
    devServer: {
        port: 8080,
        contentBase: path.join(__dirname, "dist")
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(scss|css)$/,
            use: [{
                // creates style nodes from JS strings
                loader: "style-loader",
                options: {
                    sourceMap: true
                }
            }, {
                // translates CSS into CommonJS
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                // compiles Sass to CSS
                loader: "sass-loader",
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true,
                    sourceMapContents: true
                }
            }
                // Please note we are not running postcss here
            ]
        }, {
            // Load all images as base64 encoding if they are smaller than 8192 bytes
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    // On development we want to see where the file is coming from, hence we preserve the [path]
                    name: '[path][name].[ext]?hash=[hash:20]',
                    limit: 8192
                }
            }]
        }, {
            // Load all icons
            test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
            use: [{
                loader: 'file-loader',
            }]
        }, {
            test: /\.tsx?$/,
            use: 'awesome-typescript-loader',
            exclude: /node_modules/
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dev/index.template.html',
            inject: true,
            chunks: ["index"],
            filename: "index.html"
        }),
    ]
};
