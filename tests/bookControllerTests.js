var should = require('should');
var sinon = require('sinon');
var assert = require('assert');
var supertest = require('supertest');

describe('Book controller test:', function () {
  describe('Post', function () {

    it('Should not allow empty title on post', function () {

      // mocking
      var Book = function(book){this.save = function(){}};

      var req = {
        body: {
          author: 'Franci Reven'
        }
      };

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      };

      var bookController = require('../controllers/bookController')(Book);
      bookController.post(req, res);

      assert.equal(true, res.status.calledWith(400), 'Bad status');
      assert.equal(true, res.send.calledWith('Title is required'),
        'Title is required');
    });

  });
});
