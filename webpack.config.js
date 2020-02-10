var path = require('path');

module.exports = {
  entry: './ytdl.js',
  optimization: {
    minimize: false
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};