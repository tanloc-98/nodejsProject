var express = require('express');
var router = express.Router();

const contactConfig  = require(__path_configs + 'contact');
const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'article');

const folderView	 = __path_views_blog + 'pages/article/';
const layoutBlog    = __path_views_blog + 'frontend';

/* GET home page. */
router.get('/:slug-a', async (req, res, next) => {
  let params 		 	 = ParamsHelpers.createParam(req);
  let slugArticle         = ParamsHelpers.getParam(req.params, 'slug', '');
  let itemArticle       = [];
  let othersArticle   = [];
  let contact = contactConfig;
  //article
  await ArticleModel.listItemsFrontend(slugArticle, {task: 'item-article'}).then( (item) => itemArticle = item );
  //others article
  await ArticleModel.listItemsFrontend(itemArticle,{task: 'items-article-others'}).then(item => othersArticle = item );

  res.render(`${folderView}index`,{
    layout:layoutBlog,
    top_post:false,
    sildebar:true,
    itemArticle,
    othersArticle,
    params,
    contact,
    pageTitle:'Bài viết',
    titleCategory:false,
    titleArticle:true,
  });
});
module.exports = router;
