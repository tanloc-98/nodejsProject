var express = require('express');
var router = express.Router();


const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'article');
const Aricleschemas 	= require(__path_schemas + 'article');
const CategoryModel 	= require(__path_models + 'categories');

const folderView	 = __path_views_blog + 'pages/category/';
const layoutBlog    = __path_views_blog + 'frontend';


/* GET home page. */
router.get('/count-Article', async (req, res, next) => {
  let items = await CategoryModel.listItemsFrontend(null, { task: 'items-totalsItems'});

  for(let index = 0; index < items.length; index++){
    let item = items[index];
    await Aricleschemas.count({'category.id': item._id}).then( (data) => items[index].totalsItems = data);
  }
  
  res.json(items)
});

/* GET home page. */
router.get('/:id', async (req, res, next) => {
  let params 		 	 = ParamsHelpers.createParam(req);
  let idCategory        = ParamsHelpers.getParam(req.params, 'id', '')
  let itemsInCategory   = [];
  let itemsArticle   = [];

  await ArticleModel.listItemsFrontend( {id: idCategory} ,{task: 'items-in-category'} ).then( (items) => { itemsInCategory = items; });

  await ArticleModel.listItemsFrontend({id: idCategory},{task: 'items-news'} ).then( (items) => { itemsArticle = items; });
  res.render(`${folderView}index`,{
    layout:layoutBlog,
    top_post:false,
    itemsInCategory,
    itemsArticle,
    params
  });
});

router.get('/:id/json', async (req, res, next) => {
  let idCategory        = ParamsHelpers.getParam(req.params, 'id', '');
  let itemsArticle = [];
  
  await ArticleModel.listItemsFrontend({id: idCategory},{task: 'items-news'} ).then( (items) => { itemsArticle = items; });
  
  res.json(itemsArticle);
});

router.get('/items/json', async (req, res, next) => {
  let itemsCategory   = [];
  
  //category
  await CategoryModel.listItemsFrontend(null,{task: 'items-in-menu'} ).then( (items) => { itemsCategory = items; });

  res.json(itemsCategory);
});


module.exports = router;
