/**
 * Book Controller
 */
var bookController = function (Book, Books) {

  /**
   * Get books
   * http://localhost:3000/api/books
   * http://localhost:3000/api/books?genre=Fiction
   *
   * @param req
   * @param res
     */
  var get = function (req, res) {
    var query = req.query;

    Books.forge()
      .query('where', query)
      .fetch()
      .then(function (collection) {
        res.json({error: false, data: collection.toJSON()});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  };

  /**
   * Create new book
   *
   * POST
   * http://localhost:3000/api/books
   *
   * Header: Content-Type: application/json
   * Example post body - raw:
   *
   * {
   *   "title": "Štoparski vodnik",
   *   "genre": "None Fiction",
   *   "author": "Douglas Adams",
   *   "read": false
   * }
   *
   * @param req
   * @param res
     */
  var post = function (req, res) {
    var book = Book.forge(req.body);

    if (!req.body.title) {
      res.status(400)
      res.send('Title is required')
    }
    else {
      book.save()
        .then(function (book) {
          res.status(201).json({error: false, data: {id: book.get('id')}});
        })
        .catch(function (err) {
          res.status(500);
          res.json({error: true, data: {message: err.message}});
        });
    }
  };

  /**
   * Books middleware
   *
   * @param req
   * @param res
   * @param next
   */
  var useBooksMiddleware = function (req, res, next) {
    var bookId = req.params.bookId;

    Book.forge({id: bookId})
      .fetch()
      .then(function (book) {
        if (book) {
          req.book = book;
          next();
        } else {
          res.status(404).json({error: true, data: {}})
        }
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  };

  /**
   * Get book by id.
   *
   * book from middleware
   * if there is no book checked in middleware
   * if error is also checked in middleware
   *
   * @param req
   * @param res
   */
  var getById = function (req, res) {
    res.json({error: false, data: req.book.toJSON()});
  };

  /**
   * Put book by id
   *
   * book from middleware
   * if there is no book checked in middleware
   * if error is also checked in middleware
   *
   * @param req
   * @param res
   */
  var putById = function (req, res) {
    req.book.set(req.body); // http://bookshelfjs.org/#Model-instance-set

    req.book.save()
      .then(function (book) {
        res.json({error: false, data: {data: book.toJSON()}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  };

  /**
   * Patch book by id
   *
   * @param req
   * @param res
     */
  var patchById = function (req, res) {

    if (req.body.id) {
      delete req.body.id;
    }

    for (var key in req.body) {
      req.book.set(key, req.body[key]);
    }

    req.book.save()
      .then(function (book) {
        res.json({error: false, data: {data: book.toJSON()}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  };

  /**
   * Delete book
   *
   * @param req
   * @param res
     */
  var deleteById = function (req, res) {
    req.book.destroy()
      .then(function () {
        res.status(204).json({error: false, data: {message: 'Removed'}});
      })
      .catch(function (err) {
        res.status(500).json({error: true, data: {message: err.message}});
      });
  };

  return {
    get: get,
    useBooksMiddleware: useBooksMiddleware,
    getById: getById,
    putById: putById,
    patchById: patchById,
    deleteById: deleteById,
    post: post
  };

};

module.exports = bookController;
