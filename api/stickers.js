const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
	if (!isNaN(req.params.id)) return next();
	next(new Error('Invalid ID'));
}

function validSticker(sticker) {
	const hasTitle = typeof sticker.title === 'string' && sticker.title.trim() != '';
	const hasURL = typeof sticker.url === 'string' && sticker.title.trim() != '';
	const hasDescription = typeof sticker.url === 'string' && sticker.title.trim() != '';
	const hasRating = !isNaN(sticker.rating);
	return hasTitle && hasURL && hasDescription && hasRating;
}

router.get('/', (req, res) => {
  const { title } = req.query
	queries.getAll({ title }).then((stickers) => {
		res.json(stickers);
	});
});

router.get('/:id', isValidId, (req, res, next) => {
	queries.getOne(req.params.id).then((sticker) => {
		if (sticker) {
			res.json(sticker);
		} else {
			next();
		}
	});
});

router.post('/', (req, res, next) => {
	if (validSticker(req.body)) {
		queries.create(req.body).then((stickers) => {
			res.json(stickers[0]);
		});
	} else {
		next(new Error('invalid sticker'));
	}
});

router.put('/:id', isValidId, (req, res, next) => {
	if (validSticker(req.body)) {
		queries.update(req.params.id, req.body).then((stickers) => res.json(stickers[0]));
	} else {
		next(new Error('invalid sticker'));
	}
});

router.delete('/:id', isValidId, (req, res) => {
	if (validSticker(req.body)) {
		queries.delete(req.params.id, req.body).then(() =>
			res.json({
				deleted: true
			})
		);
	}
});

module.exports = router;
