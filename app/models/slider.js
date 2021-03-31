const MainModel 	= require(__path_schemas + 'slider');
const FileHelpers = require(__path_helpers + 'file');

module.exports = {
    listItems: (params, options = null) => {
        let objWhere    = {};
        let sort		= {};
        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        if(params.categoryID !== 'allvalue' && params.categoryID !== '') objWhere['category.id'] = params.categoryID;
        sort[params.sortField]  = params.sortType;
    
        return MainModel
            .find(objWhere)
            .select('name thumb prices status ordering created modified category.name')
            .sort(sort)
            .skip((params.pagination.currentPage-1) * params.pagination.totalItemsPerPage)
            .limit(params.pagination.totalItemsPerPage);
    },
    listItemsSearch: (params, options = null) =>{
        let objWhere    = {};
        let sort		= {};
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

        return MainModel
            .find(objWhere)
            .select('name slug thumb prices status ordering created modified category')
            .sort(sort)
            .limit(9);
    },
    listItemsFrontend: (params = null, options = null) => {
        let find = {};
        let select = 'name slug thumb prices status ordering content created modified category';
        let limit = {};
        let sort = '';
        if(options.task == 'slider'){
            find = {status: 'active'};
            limit = 3;
            sort = 'asc';
        }
        return MainModel.find(find).select(select).limit(limit).sort(sort);
    }
    ,

    getItem: (id, options = null) => {
        return MainModel.findById(id);
    },

    getItemFrontEnd:(id, options = null) =>{
        return MainModel.findById(id).select('name slug thumb prices status ordering created modified category');
    },

    countItem: (params, options = null) => {
        let objWhere    = {};
        if(params.categoryID !== 'allvalue' && params.categoryID !== '') objWhere['cateogry.id'] = params.categoryID; 
        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

        return MainModel.count(objWhere);
    },


    
    changeStatus: (id, currentStatus, options = null) => {
        let status			= (currentStatus === "active") ? "inactive" : "active";
        let data 			= {
            status: status,
            modified: {
                user_id: 0,
                user_name: 0,
                time: Date.now()
            }
        }

        if(options.task == "update-one"){
            return MainModel.updateOne({_id: id}, data);
        }

        if(options.task == "update-multi"){
            data.status = currentStatus;
            return MainModel.updateMany({_id: {$in: id }}, data);
        }
    },
    
    changeOrdering: async (cids, orderings, options = null) => {
        let data = {
            ordering: parseInt(orderings), 
            modified:{
                user_id: 0,
                user_name: 0,
                time: Date.now()
                }
            };

        if(Array.isArray(cids)) {
            for(let index = 0; index < cids.length; index++) {
                data.ordering = parseInt(orderings[index]);
                await MainModel.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success");
        }else{
            return MainModel.updateOne({_id: cids}, data);
        }
    },

    deleteItem:  async (id, options = null) => {
        if(options.task == "delete-one") {
            await MainModel.findById(id).then((item) =>{
                FileHelpers.remove('public/uploads/slider/', item.thumb)
            })
            return MainModel.deleteOne({_id: id});
        }

        if(options.task == "delete-mutli") {
            if(Array.isArray(id)){
                for(let index = 0;index < id.length; index++){
                    await MainModel.findById(id[index]).then((item) =>{
                        FileHelpers.remove('public/uploads/slider/', item.thumb)
                    })
                }
            }else{
                await MainModel.findById(id).then((item) =>{
                    FileHelpers.remove('public/uploads/slider/', item.thumb)
                })
            }
            return MainModel.deleteMany({_id: {$in: id } });
        }
    },
    saveItem: (item, options = null) => {
        if(options.task == "add") {
            item.created = {
				user_id : 0,
				user_name: "admin",
				time: Date.now()
			}
            item.category = {
                id: item.category_id,
                name: item.category_name,
                slug: item.category_slug,
            }
			return new MainModel(item).save();
        }

        if(options.task == "edit") {
            return MainModel.updateOne({_id: item.id}, {
				ordering: parseInt(item.ordering),
				name: item.name,
                slug: item.slug,
                title: item.title,
                status: item.status,
                prices: item.prices,
                content: item.content,
                thumb: item.thumb,
                category: {
                    id: item.category_id,
                    name: item.category_name,
                    slug: item.category_slug,
                },
				modified: {
					user_id : 0,
        			user_name: 0,
        			time: Date.now()
				}
			});
        }

        if(options.task == "change-category-name") {
            return MainModel.updateMany({'category.id': item.id}, {
				category: {
                    id: item.id,
					name: item.name,
                    slug: item.slug,
				},
			});
        }
    }
}