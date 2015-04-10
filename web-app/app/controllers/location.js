'use strict';

var mongoose = require('mongoose'),
	Location = mongoose.model('Location');

exports.deviceLocations = function (req, res, next) {

	var id = req.params.id;

	Location.deviceLocations(id, function (err, locations) {
		if(err) return next(err);
		if(!locations) return next(new Error('Failed to load locations for device ' + id));
		res.jsonp(locations);
		next();
	});
};


exports.add = function (req, res, next) {
	var location = new Location(req.body);

	location.save(function (err) {
		if(err) return next(err);
		res.jsonp(location);
	});
};
