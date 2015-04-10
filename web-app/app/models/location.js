'use strict';

var mongoose = require('mongoose'),
	moment = require('moment'),
	Schema = mongoose.Schema;

var LocationSchema = new Schema({

	device: [Schema.Types.ObjectId],
	lat: Number,
	long: Number,
	date: {
		type: Date,
		default: moment().utc()
	}
});

LocationSchema.statics.deviceLocations = function(deviceId, cb) {
	this.find({
		device: deviceId
	}).exec(cb);
};

mongoose.model('Location', LocationSchema);
