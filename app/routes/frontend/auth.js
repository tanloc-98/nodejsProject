var express = require('express');
var router = express.Router();

var passport = require('passport'); 

const StringHelpers 	= require(__path_helpers + 'string');

const middleGetUserInfo         = require(__path_middleware + 'get-user-info');
const middleGetCategoryForMenu  = require(__path_middleware + 'get-category-for-menu');
const middleArticleRandom       = require(__path_middleware + 'get-article-random');

const systemConfig  = require(__path_configs + 'system');
const ValidateLogin	= require(__path_validates + 'login');
const layoutLogin = __path_views_blog + 'login';
const layoutBlog = __path_views_blog + 'frontend';
const folderView	 = __path_views_blog +  `pages/auth/`;

const linkIndex		= StringHelpers.formatLink('/' + systemConfig.prefixBlog + '/'); 
const linkLogin		= StringHelpers.formatLink('/' + systemConfig.prefixBlog + '/auth/login/'); 


/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.logOut();
  res.redirect(linkLogin);
});


/* GET login page. */
router.get('/login', function(req, res, next) {
  if(req.isAuthenticated()) res.redirect(linkIndex);

  let item = {email:'', 'password':''};
  let errors = null;

  res.render(`${folderView}login`, { layout: layoutLogin, errors, item});
});

/* GET dashboard page. */
router.get('/no-permission',middleGetUserInfo,middleGetCategoryForMenu,middleArticleRandom, function(req, res, next) {
	res.render(`${folderView}no-permission`, { layout: layoutBlog,  top_post: false, sidebar:false, });
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  if(req.isAuthenticated()) res.redirect(linkIndex);
  
  req.body = JSON.parse(JSON.stringify(req.body));
  ValidateLogin.validator(req);
  
  let item = Object.assign(req.body);
  let errors = req.validationErrors();

  if(errors){
    res.render(`${folderView}login`, { layout: layoutLogin, errors, item});
  }else{
    passport.authenticate('local', { 
      successRedirect: linkIndex,
      failureRedirect: linkLogin, 
      failureFlash: true
    })(req, res, next);
  }
});

module.exports = router;
