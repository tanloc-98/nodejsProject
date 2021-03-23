const notify  	= require(__path_configs + 'notify');
const util 		= require('util');

let show = (req, res, linkIndex, params = null ) => {
	let notifyContent = '';

	switch (params.task) {
		case 'change-status':
			notifyContent = notify.CHANGE_STATUS_SUCCESS;
			break;
		case 'change-special':
			notifyContent = notify.CHANGE_SPECIAL_SUCCESS;
			break;
		case 'change-multi-status':
			notifyContent = util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, params.total);
			break;
		case 'change-ordering':
			notifyContent = notify.CHANGE_ORDERING_SUCCESS;
			break;
		case 'change-group-acp':
			notifyContent = notify.CHANGE_GROUP_ACP_SUCCESS;
			break;
		case 'delete':
			notifyContent = notify.DELETE_SUCCESS;
			break;
		case 'delete-multi':
			notifyContent = util.format(notify.DELETE_MULTI_SUCCESS, params.total);
			break;
		case 'add':
			notifyContent = notify.ADD_SUCCESS;
			break;
		case 'edit':
			notifyContent = notify.EDIT_SUCCESS;
			break;
		case 'login':
			notifyContent = notify.ERROR_NAME;
		case 'add-contact-success':
			notifyContent = notify.ERROR_NAME;
			break;
		default:
			notifyContent = '';
			break;
	}

	req.flash('success', notifyContent);
	res.redirect(linkIndex);
}

module.exports = {
	show
}