const CategoryModel 	= require(__path_models + 'categories');
const CategoryProductModel 	= require(__path_models + 'categoriesStore');

module.exports = async(req, res, next) => {
    
    await CategoryModel
            .listItemsFrontend(null, {task: 'items-in-menu'} )
            .then( (items) => { res.locals.itemsCategory = items; });
    await CategoryProductModel
            .listItemsFrontend(null, {task: 'items-in-menu'} )
            .then( (items) => { res.locals.itemsCategoryProduct = items; });
    next();
}