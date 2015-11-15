/**
 * Run:
 * node migrate.js
 */

var config = require('./config');
var knex = require('knex')(config.dbConfig);

knex.schema.createTable('books', function (book) {
  book.increments('id');
  book.string('title');
  book.string('author');
  book.string('genre');
  book.string('read');
}).then(function () {
  console.log('book table crated')
});
