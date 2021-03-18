var express = require('express');
var router = express.Router();

const middleAuthentication = require(__path_middleware + 'auth');

router.use('/',  require('./home'));
router.use('/dashboard', require('./dashboard'));
router.use('/items', require('./items'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/news/categories', require('./news/categories'));
router.use('/news/article', require('./news/article'));
router.use('/store/categories', require('./store/categories'));
router.use('/store/article', require('./store/article'));
router.use('/store/slider', require('./store/slider'));
router.use('/rss', require('./rss'));

module.exports = router;
