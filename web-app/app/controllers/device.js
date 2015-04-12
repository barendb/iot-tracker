'use strict';

var mongoose = require('mongoose'),
	Device = mongoose.model('Device');

exports.all = function (req, res, next) {

	Device.find({}).exec(function (err, devices) {
		if(err) { return next(err); }
		if(devices === null) { return next(new Error('Could not load devices')); }
		res.jsonp(devices);
		//next();
	});
};

exports.single = function (req, res, next) {

	var id = req.params.id;

	console.log(id);

	Device.load(id, function (err, device) {
		if(err) { return next(err); }
		if(!device) { return next(new Error('Failed to load device ' + id)); }
		res.jsonp(device);
	});
};


exports.add = function (req, res, next) {
	var device = new Device(req.body);

	device.save(function (err) {
		if(err) { return next(err); }
		res.jsonp(device);
	});
};
