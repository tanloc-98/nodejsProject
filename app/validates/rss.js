const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    link: { min: 5, max: 100 },
    ordering: { min: 0, max: 100 },
    status: { value: 'novalue' },
}

module.exports = {
    validator: (req) => {
        // link
        req.checkBody('link', util.format(notify.ERROR_NAME, options.link.min, options.link.max) )
            .isLength({ min: options.link.min, max: options.link.max })

        // ORDERING
        req.checkBody('ordering', util.format(notify.ERROR_ORDERING, options.ordering.min, options.ordering.max))
            .isInt({gt: options.ordering.min, lt: options.ordering.max});
        
        // STATUS
        req.checkBody('status', notify.ERROR_STATUS)
            .isNotEqual(options.status.value);
        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        return errors;
    }
}