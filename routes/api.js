var express = require('express');
var router = express.Router();

var Book = require('../models/bookModel');
var bookController = require('../controllers/bookController')(Book);

router.get('/books', bookController.get);

router.post('/books', bookController.post);

router.use('/books/:bookId', function (req, res, next) {
  var bookId = req.params.bookId;

  Book.findById(bookId, function (err, book) {
    if (err) {
      res.status(500).send(err);
    }
    else if (book) {
      req.book = book;
      next();
    }
    else {
      res.status(404).send('no book found');
    }
  });
});

router.get('/books/:bookId', function (req, res) {
  // var bookId = req.params.bookId;
  // Book.findById(bookId, function (err, book) {
  //   if (err) {
  //     res.status(500).send(err);
  //   }
  //   else {
  //     res.json(book);
  //   }
  // });

  // book from middleware
  // if there is no book checked in middleware
  // if error is also checked in middleware

  res.json(req.book);
});

router.put('/books/:bookId', function (req, res) {
  //var bookId = req.params.bookId;
  //Book.findById(bookId, function (err, book) {
  //  if (err) {
  //    res.status(500).send(err);
  //  }
  //  else {
  //    book.title = req.body.title;
  //    book.author = req.body.title;
  //    book.genre = req.body.genre;
  //    book.read = req.body.read;
  //    book.save();
  //    res.json(book);
  //  }
  //});

  // book from middleware
  // if there is no book checked in middleware
  // if error is also checked in middleware

  req.book.title = req.body.title;
  req.book.author = req.body.title;
  req.book.genre = req.body.genre;
  req.book.read = req.body.read;

  req.book.save(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(req.book);
    }
  });
});

router.patch('/books/:bookId', function (req, res) {
  // if (req.body.title) {
  //   req.book.title = req.body.title;
  // }

  if (req.body._id) {
    delete req.body._id;
  }

  for (var key in req.body) {
    req.book[key] = req.body[key];
  }

  req.book.save(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(req.book);
    }
  });
});

router.delete('/books/:bookId', function (req, res) {
  req.book.remove(function (err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
      // removed
      res.status(204).send('Removed');
    }
  });
});

module.exports = router;
