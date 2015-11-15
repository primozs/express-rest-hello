var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// mongoose
mongoose.connect('mongodb://localhost/booksAPI');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function (callback) {
  console.log('connected to mongo');
});

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// routes
app.use(require('./routes'));

app.listen(port, function () {
  console.log('listening at ', port);
});

module.exports = app;
