const { describe } = require('mocha');
const knex = require('../db/knex');
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;
const fixtures = require('./fixtures');

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
});
