var express = require('express');
var router = express.Router();

const contactConfig  = require(__path_configs + 'contact');
const ArticleModel 	= require(__path_models + 'article');
const CategoryModel 	= require(__path_models + 'categories');

const folderView	 = __path_views_blog + 'pages/home/';
const layoutBlog    = __path_views_blog + 'frontend';

/* GET home page. */
router.get('/', async (req, res, next) => {

  let itemsSpecial 	= [];
  let itemsNews 	 	= [];
  let contact = contactConfig;
  //special
  await ArticleModel.listItemsFrontend(null, {task: 'items-special'} ).then( (items) => { itemsSpecial = items; });

  //special
  await ArticleModel.listItemsFrontend(null, {task: 'items-news-week'} ).then( (items) => { itemsNews = items; });

    res.render(`${folderView}index`,{
      layout:layoutBlog,
      top_post:true,
      itemsSpecial,
      itemsNews,
      contact
    });
});

router.get('/items/json', async (req, res, next) => {
  let itemsCategory   = [];
  
  //category
  await CategoryModel.listItemsFrontend(null,{task: 'items-in-menu'} ).then( (items) => { itemsCategory = items; });

  res.json(itemsCategory);
});


module.exports = router;
