var express = require('express');
var router = express.Router();

const folderView	 = __path_views_admin + 'pages/publish/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(`${folderView}index`, { pageTitle   : 'HomePage ' });
});

module.exports = router;
