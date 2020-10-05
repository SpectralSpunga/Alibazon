const app = require('express')();
app.use(require('express').static(__dirname + '/public'))

require('./routes')(app);

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});

module.exports = app;