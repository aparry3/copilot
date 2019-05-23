const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
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
