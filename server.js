const express = require('express')
const routes = require('./router/router')
const app = express()
const port = 3000
const logger = require("./utils/logger");
const bodyParser = require('body-parser')
const cors = require('cors')
const connect =  require("./utils/dbConnection")
app.disable('x-powered-by')
app.set('port', process.env.PORT || 3000);
app.use(logger);
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/', routes)
const start = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log(`REST API on http://localhost:/` + port)
    })
  } catch (e) {
    console.error(e)
  }
}

module.exports = {start: start, app: app};