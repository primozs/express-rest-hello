var config = require('./config');

var knex = require('knex')(config.dbConfig);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
