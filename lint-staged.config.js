module.exports = {
    // Run ESLint on changes to JavaScript/TypeScript files
    '**/*.(ts)?(x)': (filenames) => {
        return [
            `yarn eslint ${filenames.join(' ')} --fix`,
            `yarn prettier ${filenames.join(' ')} -w`
        ]
    }
}