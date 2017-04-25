const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

const app = new (require('express'))()
const PORT = 4000

let compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

const locales = ['en', 'ru']
locales.forEach((locale) => {
  app.get(`/dist/lang/${locale}.json`, function (req, res) {
    res.sendFile(path.join(__dirname, `/build/lang/${locale}.json`))
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

let server = app.listen(PORT, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info('==> http://localhost:%s/', PORT)
  }
})

exports.close = () => {
  server.close()
}
