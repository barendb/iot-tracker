'use strict';

var should = require('should'),
	request = require('supertest'),
	chance = require('chance').Chance(),
	app = require('../../app');

describe('GET /api/device', function () {

	it('should respond with JSON array', function (done) {
		request(app)
			.get('/api/device')
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

describe('POST /api/device', function () {

	it('should add a device and respond with JSON element', function (done) {
		var device = { name: chance.first() };

		request(app)
			.post('/api/device')
			.send(device)
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if(err) {
					return done(err);
				}

				//console.log(res.body);
				res.body.should.have.property('name', device.name);
				done();
			});
	});
});

describe('GET /api/device/:id', function () {

	it('should respond with JSON element', function (done) {
		request(app)
			.get('/api/device/552a15e9cff221bc0b35a6fb')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function (err, res) {
				if(err) {
					return done(err);
				}

				//console.log(res.body);
				res.body.should.have.property('name', 'Winifred');
				done();
			});
	});
});
