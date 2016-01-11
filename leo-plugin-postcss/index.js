var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = function configure(config) {

  config.loader('css', {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', `css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader`)
  });

  config.plugin('extract-css',
    ExtractTextPlugin, ["styles.[contenthash].css", {
      allChunks: true
    }]);

  config.merge({
    postcss: [
      require('postcss-import')(),
      require('postcss-cssnext')({
        browsers: 'last 2 versions'
      }),
      require('lost')({
        flexbox: 'flex'
      }),
      require('postcss-font-magician')({
        hosted: path.resolve(process.cwd(), './fonts')
      }),
      require('list-selectors').plugin(function(selectorList) {
        console.log(selectorList)
      })
    ]
  });

  return config;
}