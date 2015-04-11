'use strict';

var mongoose = require('mongoose'),
	Article = mongoose.model('Article');

var home = {};

home.index = function (req, res, next) {
	Article.find(function (err, articles) {
		if(err) { return next(err); }
		res.render('index', {
			title: 'Generator-Express MVC',
			articles: articles
		});
	});
};

module.exports = home;
