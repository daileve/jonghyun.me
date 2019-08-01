const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const JS_LOADER_USE = [{
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env']
    }
}];

if(process.env.NODE_ENV !== 'production') {
    JS_LOADER_USE.push({
        loader: 'eslint-loader'
    });
}

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: 'style-loader' // creates style nodes from JS strings
            }, {
                loader: 'css-loader' // translates CSS into CommonJS
            }, {
                loader: 'less-loader' // compiles Less to CSS
            }],
        }, {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: JS_LOADER_USE
        }, {
            test: /\.ttf$/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }), new UglifyJsPlugin()]
};
