const knex = require('./knex'); // connection

module.exports = {
	getAll(query) {
		console.log(query.title);
		const knexQuery = knex('sticker');
		if (query.title) {
			knexQuery.where('title', 'like', `%${query.title}%`);
		}
		return knexQuery;
	},
	getOne(id) {
		return knex('sticker').where('id', id).first();
	},
	create(sticker) {
		return knex('sticker').insert(sticker, '*');
	},
	update(id, sticker) {
		return knex('sticker').where('id', id).update(sticker, '*');
	},
	delete(id) {
		return knex('sticker').where('id', id).del();
	}
};
