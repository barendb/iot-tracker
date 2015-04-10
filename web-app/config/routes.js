'use strict';

var deviceCtrl = require('../app/controllers/device'),
	locationCtrl = require('../app/controllers/location'),
	homeCtrl = require('../app/controllers/home');

module.exports = function (app) {
	app.get('/', homeCtrl.index);

	// device
	app.get('/api/device', deviceCtrl.all);
	app.get('/api/device/:id', deviceCtrl.single);
	app.post('/api/device', deviceCtrl.add);

	// location
	app.get('/api/location/:deviceId', locationCtrl.deviceLocations);
	app.post('/api/location', locationCtrl.add);
};
