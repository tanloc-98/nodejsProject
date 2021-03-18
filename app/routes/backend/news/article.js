var express = require('express');
var router 	= express.Router();

const controllerName = "article";

const systemConfig  = require(__path_configs + 'system');
const MainModel 	= require(__path_models + controllerName);
const CategoryModel = require(__path_models + 'categories');
const MainValidate	= require(__path_validates + controllerName);
const UtilsHelpers 	= require(__path_helpers + 'utils');
const NotifyHelpers = require(__path_helpers + 'notify');
const FileHelpers   = require(__path_helpers + 'file');
const ParamsHelpers = require(__path_helpers + 'params');



const linkIndex		 = '/' + systemConfig.prefixAdmin + `/news/${controllerName}/`;
const pageTitleIndex = UtilsHelpers.capitalize(controllerName) + ' Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const folderView	 = __path_views_admin + `pages/news/${controllerName}/`;	
const uploadThumb	 = FileHelpers.upload('thumb', controllerName);
const folderLink 	 = 'public/uploads/article/';

// List items
router.get('(/status/:status)?', async (req, res, next) => {
	let params 		 	 = ParamsHelpers.createParam(req);

	let statusFilter = await UtilsHelpers.createFilterStatus(params.currentStatus, controllerName);
	await MainModel.countItem(params).then( (data) => { params.pagination.totalItems = data; });

	let categoryItems	= [];
	await CategoryModel.listItemsInSelectbox().then((items)=> {
		categoryItems = items;
		categoryItems.unshift({_id: 'allvalue', name: 'All category'});
	});

	MainModel.listItems(params)
		.then( (items) => {
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				controllerName,
				items,
				statusFilter,
				params,
				categoryItems,
			});
		});
});

// Change status
router.get('/change-status/:id/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 

	MainModel.changeStatus(id, currentStatus, {task: "update-one"})
	.then((result)=> NotifyHelpers.show(req, res, linkIndex, {task: 'change-status'}))
});

// Change status - Multi
router.post('/change-status/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	MainModel.changeStatus(req.body.cid, currentStatus, {task: "update-multi"})
	.then((result) => NotifyHelpers.show(req, res, linkIndex, {task: 'change-multi-status', total: result.n}));
});

// Change special
router.get('/change-special/:id/:special', (req, res, next) => {
	let currentSpecial	= ParamsHelpers.getParam(req.params, 'special', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 

	MainModel.changeSpecial(id, currentSpecial, {task: "update-one"})
	.then((result)=> NotifyHelpers.show(req, res, linkIndex, {task: 'change-special'}))
});

// Change ordering - Multi
router.post('/change-ordering', (req, res, next) => {
	let cids 		= req.body.cid;
	let orderings 	= req.body.ordering;
	
	MainModel.changeOrdering(cids, orderings, null)
	.then((result)=> NotifyHelpers.show(req, res, linkIndex, {task: 'change-ordering'}));
});

// Delete
router.get('/delete/:id', async (req, res, next) => {
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	MainModel.deleteItem(id, {task: 'delete-one'} )
	.then((result) => NotifyHelpers.show(req, res, linkIndex, {task: 'delete'}));
});

// Delete - Multi
router.post('/delete', (req, res, next) => {
	MainModel.deleteItem(req.body.cid, {task: 'delete-mutli'} )
	.then((result) =>  NotifyHelpers.show(req, res, linkIndex, {task: 'delete-multi', total: result.n}));
});

// FORM

router.get(('/form(/:id)?'), async (req, res, next) => {
	let id		= ParamsHelpers.getParam(req.params, 'id', '');
	let item	= {name: '', ordering: 0, status: 'novalue', category_id: '', category_name: ''};
	let errors   = null;
	let categoryItems	= [];
	await CategoryModel.listItemsInSelectbox().then((items)=> {
		categoryItems = items;
		categoryItems.unshift({_id: 'allvalue', name: 'All category'});
	});
	
	if(id === '') { // ADD
		res.render(`${folderView}form`, { pageTitle: pageTitleAdd, controllerName, item, errors, categoryItems});
	}else { // EDIT
		MainModel.getItem(id).then( (item) =>{
			item.category_id = item.category.id;
			item.category_name = item.category.name;
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, controllerName, item, errors, categoryItems});
		});	
	}
});
// SAVE = ADD EDIT
router.post('/save', async(req, res, next) => {
	uploadThumb(req, res, async (errUpload) => {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);	
		let taskCurrent	= (typeof item !== "undefined" && item.id !== "" ) ? "edit" : "add";
		let errors = MainValidate.validator(req, errUpload, taskCurrent);
		
		if(errors.length > 0) { 
			let pageTitle = (taskCurrent == "add") ? pageTitleAdd : pageTitleEdit;
			if(req.file != undefined) FileHelpers.remove(folderLink, req.file.filename); // xóa tấm hình khi form không hợp lệ

			let categoryItems	= [];
			await CategoryModel.listItemsInSelectbox().then((items)=> {
				categoryItems = items;
				categoryItems.unshift({_id: 'allvalue', name: 'All category'});
			});
			
			if (taskCurrent == "edit") item.thumb = item.image_old;
			res.render(`${folderView}form`, { pageTitle, item, errors, categoryItems});
		}else {
			let message = (taskCurrent == "add") ? NotifyHelpers.EDIT_SUCCESS : NotifyHelpers.EDIT_SUCCESS;
			if(req.file == undefined){ // không có upload lại hình
				item.thumb = item.image_old;
			}else{
				item.thumb = req.file.filename;
				
				if(taskCurrent == "edit") FileHelpers.remove(folderLink, item.image_old);
			}

			MainModel.saveItem(item, {task: taskCurrent})
			.then((result) => NotifyHelpers.show(req, res, linkIndex, {task: taskCurrent}));
		}
		
	});
});

// SORT
router.get(('/sort/:sort_field/:sort_type'), (req, res, next) => {
	req.session.sort_field		= ParamsHelpers.getParam(req.params, 'sort_field', 'ordering');
	req.session.sort_type		= ParamsHelpers.getParam(req.params, 'sort_type', 'asc');
	res.redirect(linkIndex);
});

// FILTER CATEGORY
router.get(('/filter-category/:category_id'), (req, res, next) => {
	req.session.category_id		= ParamsHelpers.getParam(req.params, 'category_id', '');
	res.redirect(linkIndex);
});



module.exports = router;
