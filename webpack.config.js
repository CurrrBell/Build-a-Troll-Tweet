const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'eval-source-map',
    module: {        
        rules: [
            // JS 
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // CSS
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            sourceMap: true
                        }
                    }
                ]
            }
            // {
            //     test: /\.json$/,
            //     use: ['json-loader']
            // }
            // //CSV
            // {
            //     test: /\.csv$/,
            //     loader: 'csv-loader',
            //     options: {
            //         dynamicTyping: true,
            //         header: true,
            //         skipEmptyLines: true,
            //         worker: true,
            //         step: function(row) {
            //             console.log("Row:", row.data);
            //         },
            //         complete: function() {
            //             console.log("All done!");
            //         }
            //     }
            // }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
        template: './index.html'
        //favicon: 'public/favicon.ico'
        })
    ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true,
        hot: true
    }
};