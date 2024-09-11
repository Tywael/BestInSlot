const path = require('path');

module.exports = {
    mode: 'development', // Set the mode to 'development' or 'production'
    entry: {
        background: './src/background.js',
        content_deathknight: './src/content_death-knight.js',
        content_demonhunter: './src/content_demon-hunter.js',
        content_druid: './src/content_druid.js',
        content_evoker: './src/content_evoker.js',
        content_hunter: './src/content_hunter.js',
        content_mage: './src/content_mage.js',
        content_monk: './src/content_monk.js',
        content_paladin: './src/content_paladin.js',
        content_priest: './src/content_priest.js',
        content_rogue: './src/content_rogue.js',
        content_shaman: './src/content_shaman.js',
        content_warlock: './src/content_warlock.js',
        content_warrior: './src/content_warrior.js',
        extractors: './src/extractors.js',
        popup: './src/popup.js' // Add this line for the popup script
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'module' // Ensure output is an ES module
    },
    experiments: {
        outputModule: true // Enable output as ES modules
    },
    devtool: 'source-map', // Use a safer devtool option
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};