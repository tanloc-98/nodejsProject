module.exports = (req, res, next) => {
    let userInfo = {};
    if(req.isAuthenticated()){
        userInfo = req.user;
    }
    res.locals.userInfo = userInfo;
    next();
}