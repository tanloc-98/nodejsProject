var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'article');

const folderView	 = __path_views_blog + 'pages/search/';
const layoutBlog    = __path_views_blog + 'frontend';


/* GET home page. */
router.get('/', async (req, res, next) => {
  let params 		 	 = ParamsHelpers.createParam(req);
  let itemsSearch = [];
  
  await ArticleModel.listItemsSearch(params).then((items) => {itemsSearch = items});

  res.render(`${folderView}index`, {
    layout:layoutBlog,
    top_post:false,
    itemsSearch,
    params
  });
});


module.exports = router;
