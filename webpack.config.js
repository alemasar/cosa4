const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require("glob");


const path = require('path');
const pjson = require('./package.json');

var p = {}
p['./dist/js/' + pjson.name + '.bundle.js'] = './src/js/main.js';
p['./dist/js/app.bundle.js'] = './src/js/app.js';
//p['./dist/js/base/base.bundle.js'] = './base/js/base.js';
p['./dev/dist/js/main.bundle.js'] = './dev/src/js/main.js';

var css = {}
css['./dist/css/' + pjson.name ] = './src/sass/' + pjson.name + '.scss';

const extractStyles = (loaders) => {
    return ExtractTextPlugin.extract({
        use: loaders
    });
};

module.exports = [
    {
        entry: p,
        output: {
            path: path.resolve(__dirname),
            pathinfo: true,
            filename: "[name]",
            chunkFilename: "[id].bundle.js"
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        }
    },
    {
        entry: css,
        output: {
            path: path.resolve(__dirname),
            pathinfo: true,
            filename: "[name].css"
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: extractStyles(['css-loader', 'sass-loader'])
                },
                {
                    test: /\.css$/,
                    use: extractStyles(['css-loader'])
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({ // define where to save the file
                filename: "[name].css",
                allChunks: true
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: './',
            historyApiFallback: true,
            inline: true,
            overlay: {
                errors: true,
                warnings: true,
            }
        }
    }
]
