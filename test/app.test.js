const { describe } = require('mocha');
const knex = require('../db/knex');
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const fixtures = require('./fixtures');
const assert = require('assert');

describe('CRUD Stickers', () => {
	before((done) => {
		// run migrations
		knex.migrate
			.latest()
			.then(() => {
				// run seeds
				return knex.seed.run();
			})
			.then(() => done());
	});

	it('lists all records', (done) => {
		request(app)
			.get('/api/v1/stickers')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).to.be.a('array');
				expect(res.body).to.deep.equal(fixtures.stickers);
				done();
			});
	});

	it('lists a record by id', (done) => {
		request(app)
			.get('/api/v1/stickers/1')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).to.be.a('object');
				expect(res.body).to.deep.equal(fixtures.stickers[0]);
				done();
			});
	});

	it('create a record', (done) => {
		request(app)
			.post('/api/v1/stickers')
			.send(fixtures.sticker)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).to.be.a('object');
				fixtures.sticker.id == res.body.id;
				expect(res.body).to.deep.equal(fixtures.sticker);
				done();
			})
			.catch((error) => {
				return error && done();
			});
	});

	it('updates a record', (done) => {
		fixtures.sticker.rating = 5;
		request(app)
			.put('/api/v1/stickers/10')
			.send(fixtures.sticker)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).to.be.a('object');
				fixtures.sticker.id == res.body.id;
				expect(res.body).to.deep.equal(fixtures.sticker);
				done();
			})
			.catch((error) => {
				return error && done();
			});
	});

	it('deletes a record', (done) => {
		request(app)
			.delete('/api/v1/stickers/10')
			.send(fixtures.sticker)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((res) => {
				expect(res.body).to.be.a('object');
				fixtures.sticker.id == res.body.id;
				expect(res.body).to.deep.equal({
					deleted: true
				});
				done();
			})
			.catch((error) => {
				return error && done();
			});
	});
});
