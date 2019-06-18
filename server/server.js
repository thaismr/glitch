const express = require('express')
const models = require('./models')
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const passportConfig = require('./services/auth')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const schema = require('./schema/schema')

// Replace your passwords, server addresses, etc:
const private = require('../private/private')

const app = express()

const { MONGO_URI } = private
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance'))
  .on('error', () => console.log('Error connecting to MongoLab:'))

  /*
  mongoose.connect(MONGO_URI, {
  authSource: "admin",
  retryWrites: true,
  dbName: "graphql",
  useCreateIndex: true,
  useNewUrlParser: true
});
const db = mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));
  */

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    //url: MONGO_URI,
    mongooseConnection: db,
    autoReconnect: true
  })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

/*
var path = require('path');

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
*/


const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
app.use(webpackMiddleware(webpack(webpackConfig)))


module.exports = app
