const knex = require('./knex'); // connection

module.exports = {
	getAll() {
		return knex('sticker');
	},
	getOne(id) {
		return knex('sticker').where('id', id).first();
	}
};
