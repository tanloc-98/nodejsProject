var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/products', require('./article'));
router.use('/cart-product', require('./cartProduct'));
router.use('/checkout', require('./checkout'));
router.use('/', require('./category'));

module.exports = router;