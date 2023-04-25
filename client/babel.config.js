module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],

    test: {
        presets: ["es2015", "react", "stage-0"]
}
};