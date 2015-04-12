'use strict';

var should = require('should'),
	request = require('supertest'),
	chance = require('chance').Chance(),
	app = require('../../app');


describe('GET /api/location/:id', function () {

	it('should respond with JSON array of locations', function (done) {
		request(app)
			.get('/api/location/552a15e9cff221bc0b35a6fb')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if(err) {
					return done(err);
				}

				res.body.should.be.instanceof(Array);
				done();
			});
	});
});


describe('POST /api/location', function () {

	it('should create a new location and respond with JSON element', function (done) {
		var location = {
			device: '552a15e9cff221bc0b35a6fb',
			lat: chance.latitude(),
			long: chance.longitude(),
		};

		request(app)
			.post('/api/location')
			.send(location)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if(err) {
					return done(err);
				}

				//console.log(res.body);
				res.body.should.have.property('device', [location.device]);
				res.body.should.have.property('lat', location.lat);
				res.body.should.have.property('long', location.long);
				res.body.should.have.property('date');
				done();
			});
	});
});
