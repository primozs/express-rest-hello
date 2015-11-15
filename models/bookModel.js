var bookshelf = require('../bookshelf');

var Book = bookshelf.Model.extend({
  tableName: 'books'
});

var Books = bookshelf.Collection.extend({
  model: Book
});

module.exports = {
  Book: Book,
  Books: Books
};
