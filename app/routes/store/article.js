var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const articleStoreModel =  require(__path_models + 'articleStore');

const folderView	 = __path_views_store + 'pages/article/';
const layoutStore    = __path_views_store + 'store';

/* GET home page. */
router.get('/:slug', async (req, res, next) => {
    let slugArticle         = ParamsHelpers.getParam(req.params, 'slug', '');
    let itemArticle       = [];
    //article
    await articleStoreModel.listItemsFrontend(slugArticle, {task: 'item-article'}).then( (item) => itemArticle = item );

    res.render(`${folderView}index`,{
      layout:layoutStore,
      slider:false,
      itemArticle
    });
});


module.exports = router;
