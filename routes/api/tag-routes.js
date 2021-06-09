const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router
	.route('/')
	.get(async (req, res) => {
		// find all tags
		// be sure to include its associated Product data
		try {
			const getAllTags = await Tag.findAll({
				include: [{ model: Product }],
			});
			res.status(200).json(getAllTags);
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.post(async (req, res) => {
		// create a new tag
		try {
			const newTag = await Tag.create(req.body);
			res.status(200).json(newTag);
		} catch (err) {
			res.status(500).json(err);
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		// find a single tag by its `id`
		// be sure to include its associated Product data
		try {
			const getTags = await Tag.findByPk(req.params.id, {
				include: [{ model: Product }],
			});
			res.status(200).json(getTags);
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.put(async (req, res) => {
		// update a tag's name by its `id` value
		try {
			const updateTag = await Tag.update(req.body, {
				where: {
					id: req.params.id,
				},
			});
			if (!updateTag[0]) {
				res.status(404).json({ message: 'No tag with this id' });
			}
			res.status(200).json({
				message: `Tag updated.`,
			});
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.delete(async (req, res) => {
		// delete on tag by its `id` value
		try {
			const deleteTag = await Tag.destroy({
				where: {
					id: req.params.id,
				},
			});
			if (!deleteTag) {
				res.status(404).json({ message: 'No tag with this id' });
				return;
			}
			res.status(200).json({ message: 'Tag Deleted' });
		} catch (err) {
			res.status(500).json(err);
		}
	});

// router.post('/', async (req, res) => {
// 	// create a new tag
// 	try {
// 		const newTag = await Tag.create(req.body);
// 		res.status(200).json(newTag);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// router.put('/:id', async (req, res) => {
// 	// update a tag's name by its `id` value
// 	try {
// 		const updateTag = await Tag.update(req.body, {
// 			where: {
// 				id: req.params.id,
// 			},
// 		});
// 		if (!updateTag[0]) {
// 			res.status(404).json({ message: 'No tag with this id' });
// 		}
// 		res.status(200).json({
// 			message: `Tag updated.`,
// 		});
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// router.delete('/:id', async (req, res) => {
// 	// delete on tag by its `id` value
// 	try {
// 		const deleteTag = await Tag.destroy({
// 			where: {
// 				id: req.params.id,
// 			},
// 		});
// 		if (!deleteTag) {
// 			res.status(404).json({ message: 'No tag with this id' });
// 			return;
// 		}
// 		res.status(200).json({ message: 'Tag Deleted' });
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = router;
