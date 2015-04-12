'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DeviceSchema = new Schema({
	name: String,
});

DeviceSchema.statics.load = function(id, cb) {
	this.findOne({
		_id: id
	}).exec(cb);
};

mongoose.model('Device', DeviceSchema);
