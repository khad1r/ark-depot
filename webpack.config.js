const path = require('path');

const exportBundle = {
    resolve: {
        fallback: {
            fs: false, // fallback for 'fs'
            path: require.resolve('path-browserify'), // fallback for 'path'
            crypto: require.resolve('crypto-browserify'), // fallback for 'crypto'
            // crypto: require.resolve('crypto-browserify'), // fallback for 'crypto'
            stream: require.resolve("stream-browserify")
        },
    },
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
};
const exportItems = {

    entry: './src/items.json',
    output: {
        filename: 'items.js',
        path: path.resolve(__dirname, 'public'),
    },
};

module.exports = exportBundle, exportItems
