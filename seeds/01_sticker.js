const stickers = require('../stickers');

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('sticker').del().then(function() {
		return knex('sticker').insert(stickers);
	});
};
