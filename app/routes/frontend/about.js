var express = require('express');
var router = express.Router();

const contactConfig  = require(__path_configs + 'contact');
const folderView	 = __path_views_blog + 'pages/about/';
const layoutBlog    = __path_views_blog + 'frontend';

/* GET home page. */
router.get('/', async (req, res, next) => {
  let contact = contactConfig;

  res.render(`${folderView}index`,{
    layout:layoutBlog,
    top_post:false,
    contact,
    pageTitle:'Giới thiệu',
  });
});

module.exports = router;
