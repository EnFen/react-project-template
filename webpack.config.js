const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
        index: path.join(__dirname, 'src', 'index.tsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: {
                    // Compiles ts to js
                    loader: 'ts-loader'
                }
            },
            { // tests for CSS modules
                test: /\.module\.s(a|c)ss$/,
                loader: [
                    // style-loader Creates `style` nodes from JS strings
                    // mini-css-extract-plugin extracts CSS to file on build (essential for production)
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        // Translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        // Compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            { // tests for all other CSS (not modules)
                test: /\.s(a|c)ss$/,
                exclude: /\.module\.(s(a|c)ss)$/,
                loader: [
                    // style-loader Creates `style` nodes from JS strings
                    // mini-css-extract-plugin extracts CSS to file on build (essential for production)
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    {
                        // Compiles Sass to CSS
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name]_bundle.js'
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        })
    ]
}