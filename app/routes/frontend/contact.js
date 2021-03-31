var express = require('express');
var router = express.Router();

const controllerName = 'contact';

const contactConfig  = require(__path_configs + 'contact');
const systemConfig  = require(__path_configs + 'system');
const MainModel 	= require(__path_models + controllerName);
const MainValidate	= require(__path_validates + controllerName);

const NotifyHelpers = require(__path_helpers + 'notify');
const linkIndex		 	= systemConfig.prefixBlog + `/lien-he/`;

const folderView	 = __path_views_blog + 'pages/contact/';
const layoutBlog    = __path_views_blog + 'frontend';

/* GET home page. */
router.get('/', async (req, res, next) => {
  let errors = null
  let contact = contactConfig;
  res.render(`${folderView}index`,{
    layout:layoutBlog,
    top_post:false,
    errors,
	contact,
	pageTitle:'Liên hệ',
	titleCategory:false,
	titleArticle:false,
  });
});

// SAVE = ADD EDIT
router.post('/save', async (req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	MainValidate.validator(req);

	let item = Object.assign(req.body);
	let errors = null
	let contact = contactConfig;
  errors = req.validationErrors();
	let taskCurrent = 'add';

	if(errors) { 
        res.render(`${folderView}index`, {layout:layoutBlog, top_post:false, item, errors,contact});
	} else {
		MainModel.saveItem(item, {task: taskCurrent}).then( (result) => {
			  NotifyHelpers.show(req, res, linkIndex, {task: 'add-contact-success'},contact);
		});
	}
});

module.exports = router;
