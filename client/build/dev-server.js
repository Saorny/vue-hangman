const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.dev.conf')

const app = express()
const compiler = webpack(config)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  },
  proxy: {
    '/websocket': {
      target: 'ws://127.0.0.1:3030',
      secure: false,
      ws: true,
    },
  },
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
// serve webpack bundle output
app.use(devMiddleware)
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
// serve pure static assets
app.use('/static', express.static('./static'))

app.listen(8080, (err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8080')
})
