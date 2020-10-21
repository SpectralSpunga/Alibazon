const express = require('express')
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(require('cookie-parser')())
app.use(require('./middlewares/secretKeyAdder').secretKeyAdder)

const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: "https://62beff43ef9b4db8a3d56b7a44356062@o459000.ingest.sentry.io/5457482",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

app.use(express.static(__dirname + '/public'))

require('./routes')(app);

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;