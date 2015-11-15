var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));
router.use('/', function (req, res) {
  res.type('html');
  res.send('Hello api');
});

module.exports = router;
