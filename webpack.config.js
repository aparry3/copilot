const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (env) => ({
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
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }

        ]
    },
    plugins: [
        new Dotenv({
            path: !!env ? `./.env.${env}` : `./.env`
        })
    ]
})
