var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const articleStoreModel =  require(__path_models + 'articleStore');

const folderView	 = __path_views_store + 'pages/category/';
const layoutStore    = __path_views_store + 'store';

/* GET home page. */
router.get('/:slug', async (req, res, next) => {
    let slugCategory = ParamsHelpers.getParam(req.params, 'slug', '');
    let itemsInCategory = [];

    await articleStoreModel.listItemsFrontend({slug: slugCategory}, {task: 'items-in-category'}).then( items => itemsInCategory = items)
    
    res.render(`${folderView}index`,{
      layout:layoutStore,
      slider:false,
      itemsInCategory
    });
});


module.exports = router;
