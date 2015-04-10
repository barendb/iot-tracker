'use strict';

var mongoose = require('mongoose'),
	Device = mongoose.model('Device');

exports.all = function (req, res, next) {

	Device.find({}).exec(function (err, devices) {
		if(err) { return next(err); }
		if(!devices) { return next(new Error('Could not load devices')); }
		res.jsonp(devices);
		next();
	});
};

exports.single = function (req, res, next) {

	var id = req.params.id;

	Device.getByid(id, function (err, device) {
		if(err) { return next(err); }
		if(!device) { return next(new Error('Failed to load device ' + id)); }
		req.device = device;
		next();
	});
};


exports.add = function (req, res, next) {
	var device = new Device(req.body);

	device.save(function (err) {
		if(err) { return next(err); }
		res.jsonp(device);
	});
};
