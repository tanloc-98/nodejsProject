var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/category', require('./category'));
router.use('/article', require('./article'));
router.use('/cart-product', require('./cartProduct'));
router.use('/checkout', require('./checkout'));

module.exports = router;