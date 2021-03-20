var express = require('express');
var router = express.Router();

const middleGetUserInfo         = require(__path_middleware + 'get-user-info');
const middleGetCategoryForMenu  = require(__path_middleware + 'get-category-for-menu');
const middleArticleRandom       = require(__path_middleware + 'get-article-random');

router.use('/auth', require('./auth'));
router.use('/',middleGetUserInfo, middleGetCategoryForMenu, middleArticleRandom, require('./home'));
router.use('/tin-tuc', require('./article'));
router.use('/tin-tuc', require('./category'));
router.use('/tin-tong-hop', require('./rss'));
router.use('/contact', require('./contact'));
router.use('/about', require('./about'));
router.use('/search', require('./search'));
module.exports = router;