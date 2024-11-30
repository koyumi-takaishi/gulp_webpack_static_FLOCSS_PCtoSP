const path = require('path');
const glob = require('glob');

const entries = {};
const srcDir = '../src/js/entries';

glob.sync('**/*.js', {
  ignore: '**/_*.js',
  cwd: srcDir,
}).map((value) => {
  entries[value] = path.resolve(srcDir, value);
  return entries;
});

module.exports = {
  entry: entries,
  output: {
    filename: '[name]',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
    }],
  },
};
