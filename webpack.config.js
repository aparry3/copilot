const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
    	        test: /\.(js|jsx)$/,
    	        exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: true
                    }
                }
            }
        ]
    }

}
