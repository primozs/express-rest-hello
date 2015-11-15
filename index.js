var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use(require('./routes'));

app.listen(port, function () {
  console.log('listening at ', port);
});

module.exports = app;
