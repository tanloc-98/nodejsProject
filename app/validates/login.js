const util  = require('util');
const notify = require(__path_configs + 'notify');

const options = {
    username: {min: 3, max: 10},
}

module.exports = {
    validator: (req) => {
        // username
        req.checkBody('username', util.format(notify.ERROR_NAME, options.username.min, options.username.max) )
            .isLength({ min: options.username.min, max: options.username.max })

        // // password
        // req.checkBody('password', util.format(notify.ERROR_NAME, options.password.min, options.password.max))
        //     .isInt({gt: options.password.min, lt: options.password.max});
    }
}