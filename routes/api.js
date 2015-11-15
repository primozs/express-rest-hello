var express = require('express');
var router = express.Router();

var Book = require('../models/bookModel').Book;
var Books = require('../models/bookModel').Books;
var bookController = require('../controllers/bookController')(Book, Books);

router.get('/books', bookController.get);

router.post('/books', bookController.post);

router.use('/books/:bookId', bookController.useBooksMiddleware);

router.get('/books/:bookId', bookController.getById);

router.put('/books/:bookId', bookController.putById);

router.patch('/books/:bookId', bookController.patchById);

router.delete('/books/:bookId', bookController.deleteById);

module.exports = router;
