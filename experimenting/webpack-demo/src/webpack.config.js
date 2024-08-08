const HtmlWebpackPlugin = require('html-webpack-plugin');

// ...
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
    ]