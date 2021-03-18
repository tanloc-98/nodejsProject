var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'article');

const folderView	 = __path_views_blog + 'pages/article/';
const layoutBlog    = __path_views_blog + 'frontend';

/* GET home page. */
router.get('/:id', async (req, res, next) => {
  let params 		 	 = ParamsHelpers.createParam(req);
  let idArticle         = ParamsHelpers.getParam(req.params, 'id', '');
  let itemArticle       = [];
  let othersArticle     = [];

  //article
  await ArticleModel.getItemFrontEnd(idArticle, {task: 'items-random'}).then( (item) =>{itemArticle = item;});
  //others article
  await ArticleModel.listItemsFrontend(itemArticle,{task: 'items-others'}).then((item) =>{ othersArticle = item })

  res.render(`${folderView}index`,{
    layout:layoutBlog,
    top_post:false,
    sildebar:true,
    othersArticle,
    itemArticle,
    params
  });
});
module.exports = router;
