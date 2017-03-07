const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

const app = new (require('express'))()
const PORT = 4000

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> http://localhost:%s/", PORT)
  }
})