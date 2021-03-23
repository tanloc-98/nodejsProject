var express = require('express');
var router = express.Router();

const folderView	 = __path_views_admin + 'pages/dashboard/';
const ItemsModel 	= require(__path_schemas + 'items');
const GroupsModel 	= require(__path_schemas + 'groups');
const UsersModel 	= require(__path_schemas + 'users');
const CategoryModel 	= require(__path_schemas + 'categories');
const ArticleModel 	= require(__path_schemas + 'article');
const RssModel 	= require(__path_schemas + 'rss');
const CategoriesProductModel 	= require(__path_schemas + 'categoriesStore');
const ArticleProductModel 	= require(__path_schemas + 'articleStore');
const SliderModel 	= require(__path_schemas + 'slider');
const ContactModel 	= require(__path_schemas + 'contact');

/* GET dashboard page. */
router.get('/', async(req, res, next) => {

	let countItems = 0;
	let countGroups = 0;
	let countUsers = 0;
	let countCategories = 0;
	let countArticle = 0;
	let countRss = 0;
	let countCategoriesProduct = 0;
	let countArticleProduct = 0;
	let countSlider = 0;
	let countContact = 0;

	await ItemsModel.count({}).then( (data) => {
		countItems = data;
	});

	await GroupsModel.count({}).then( (data) => {
		countGroups = data;
	});

	await UsersModel.count({}).then( (data) => {
		countUsers = data;
	});
	
	await CategoryModel.count({}).then( (data) => {
		countCategories = data;
	});

	await ArticleModel.count({}).then( (data) => {
		countArticle = data;
	});

	await RssModel.count({}).then( (data) => {
		countRss = data;
	});

	await CategoriesProductModel.count({}).then( (data) => {
		countCategoriesProduct = data;
	});

	await ArticleProductModel.count({}).then( (data) => {
		countArticleProduct = data;
	});

	await SliderModel.count({}).then( (data) => {
		countSlider = data;
	});

	await ContactModel.count({}).then( (data) => {
		countContact = data;
	});

	res.render(`${folderView}index`, { 
		pageTitle: 'Dashboard Page', 
		countItems,
		countGroups,
		countUsers,
		countCategories,
		countArticle,
		countRss,
		countCategoriesProduct,
		countArticleProduct,
		countSlider,
		countContact
	});
});

module.exports = router;
