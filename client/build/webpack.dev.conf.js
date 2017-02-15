const webpack = require('webpack')
const config = require('./webpack.base.conf')
const cssLoaders = require('./css-loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// eval-source-map is faster for development
config.devtool = '#eval-source-map'

config.vue = config.vue || {}
config.vue.loaders = config.vue.loaders || {}
cssLoaders({
  sourceMap: false,
  extract: false
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value
})

// add hot-reload related code to entry chunks
const polyfill = 'eventsource-polyfill'
const devClient = './build/dev-client'
Object.keys(config.entry).forEach(function (name, i) {
  var extras = i === 0 ? [polyfill, devClient] : [devClient]
  config.entry[name] = extras.concat(config.entry[name])
})

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/'

config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  })
])

module.exports = config
