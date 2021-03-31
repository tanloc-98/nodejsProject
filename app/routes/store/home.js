var express = require('express');
var router = express.Router();


const sliderModel =  require(__path_models + 'slider');
const articleStoreModel =  require(__path_models + 'articleStore');


const folderView	 = __path_views_store + 'pages/home/';
const layoutStore    = __path_views_store + 'store';

/* GET home page. */
router.get('/', async (req, res, next) => {
    let silderItems = [];
    let itemsFeatuers = [];

    await sliderModel.listItemsFrontend(null, {task: 'slider'}).then( items => silderItems = items)

    await articleStoreModel.listItemsFrontend(null, {task: 'items-features'}).then( items => itemsFeatuers = items)

    res.render(`${folderView}index`,{
      layout:layoutStore,
      slider:true,
      silderItems,
      itemsFeatuers
    });
});

router.get('/add-to-cart/:id', async (req, res, next) => {
  
});
module.exports = router;
