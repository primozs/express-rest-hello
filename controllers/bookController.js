/*

 Header: Content-Type: application/json
 Example post body - raw:
 {
 "title": "My book",
 "genre": "Fiction",
 "author": "Primoz Susa"
 }

*/

var bookController = function(Book) {

  var get = function (req, res) {
    var query = req.query;

    Book.find(query, function (err, books) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(books)
      }
    });
  };

  var post = function (req, res) {
    var book = new Book(req.body);

    if (!req.body.title) {
      res.status(400)
      res.send('Title is required')
    }
    else {
      book.save(function (err) {
        if (err) {
          res.status(500)
          res.send(err)
        }
        else {
          // created
          res.status(201).json(book);
        }
      });
    }
  };

  return {
    get: get,
    post: post
  };

};

module.exports = bookController;
