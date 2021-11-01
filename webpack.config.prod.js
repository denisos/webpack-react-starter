const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,                  // don't auto open
    reportFilename: 'bundle_sizes.html'   // rename gend file
  })]
});
