exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('stickers').del().then(() => {
		return knex('sticker').insert(stickers);
	});
};
