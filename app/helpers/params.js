

let getParam = (params, property, defaultValue ) => {
    if(params.hasOwnProperty(property) && params[property] !== undefined){
		return params[property];
	}

	return defaultValue;
}

let createParam = (req) => {
    let params 		 	 = {};
	params.keyword		 = getParam(req.query, 'keyword', '');
	params.currentStatus = getParam(req.params, 'status', 'all'); 
	params.currentSpecial= getParam(req.params, 'special', 'all'); 
	params.sortField  	 = getParam(req.session, 'sort_field', 'name');
	params.sortType 	 = getParam(req.session, 'sort_type', 'asc');
	params.groupID 		 = getParam(req.session, 'group_id', '');
	params.categoryID 	 = getParam(req.session, 'category_id', ''); 

	params.pagination  	 = {
		totalItems		 : 1,
		totalItemsPerPage: 4,
		currentPage		 : parseInt(getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};

	return params;
}

module.exports = {
	getParam,
	createParam
}