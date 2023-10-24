var express = require('express');
var router = express.Router();


var usersRouter = require('./users');
router.use('/users', usersRouter);

var productRouter = require('./products');
router.use('/products', productRouter);

module.exports = router;