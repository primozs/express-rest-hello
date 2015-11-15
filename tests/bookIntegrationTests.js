//var should = require('should');
//var request = require('supertest');
//var app = ('../index.js');
//var mongoose = require('mongoose');
//var Book = mongoose.model('Book');
//var agent = request.agent(app);
//
//describe('Book crud test', function () {
//  it('should allow a book to be posted, return read and _id', function (done) {
//    var bookPost = {title: 'new book', author: 'Johan', genre: 'Fiction'};
//
//    agent.post('/api/books')
//      .send(bookPost)
//      .expect(200)
//      .end(function (err, results) {
//        results.body.read.should.not.equal(false);
//        results.body.should.have.property('_id');
//        done();
//      });
//
//    //afterEach(function (done) {
//    //  Book.remove().exec();
//    //  done();
//    //});
//
//  });
//
//});
