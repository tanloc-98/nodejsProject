var express = require('express');
var router = express.Router();


const folderView	 = __path_views_store + 'pages/home/';
const layoutStore    = __path_views_store + 'store';

/* GET home page. */
router.get('/', async (req, res, next) => {


    res.render(`${folderView}index`,{
      layout:layoutStore,
    });
});


module.exports = router;
