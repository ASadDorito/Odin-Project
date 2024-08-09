const HtmlWebpackPlugin = require('html-webpack-plugin');

// ...
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ]