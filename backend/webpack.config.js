const path = require('path');

const SRC_PATH = path.resolve(__dirname, './src/index.js');
const BUILD_PATH = path.resolve(__dirname, '../build');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode,
    target: 'node',
    entry: SRC_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'index.js',
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins : ['@babel/plugin-proposal-class-properties'],
                    }
                }
            },
        ]
    },
    node: {
        __dirname: false,
    }
};