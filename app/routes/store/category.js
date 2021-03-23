var express = require('express');
var router = express.Router();


const folderView	 = __path_views_store + 'pages/category/';
const layoutStore    = __path_views_store + 'store';

/* GET home page. */
router.get('/', async (req, res, next) => {

    res.render(`${folderView}index`,{
      layout:layoutStore,
      slider:false
    });
});


module.exports = router;
