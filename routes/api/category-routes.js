const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router
	.route('/')
	.get(async (req, res) => {
		// find all categories
		// be sure to include its associated Products
		try {
			const getAllCategories = await Category.findAll({
				include: [{ model: Product }],
			});
			res.status(200).json(getAllCategories);
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.post(async (req, res) => {
		// create a new category
		try {
			const newCategory = await Category.create(req.body);
			res.status(200).json(newCategory);
		} catch (err) {
			res.status(500).json(err);
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		// find one category by its `id` value
		// be sure to include its associated Products
		try {
			const getCategory = await Category.findByPk(req.params.id, {
				include: [{ model: Product }],
			});
			res.status(200).json(getCategory);
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.put(async (req, res) => {
		// update a category by its `id` value
		try {
			const updateCategory = await Category.update(req.body, {
				where: {
					id: req.params.id,
				},
			});
			if (!updateCategory[0]) {
				res.status(404).json({ message: 'No category with this id' });
			}
			res.status(200).json({
				message: `Category updated.`,
			});
		} catch (err) {
			res.status(500).json(err);
		}
	})
	.delete(async (req, res) => {
		// delete a category by its `id` value
		try {
			const deleteCategory = await Category.destroy({
				where: {
					id: req.params.id,
				},
			});
			if (!deleteCategory) {
				res.status(404).json({ message: 'No category with this id' });
				return;
			}
			res.status(200).json({ message: 'Category Deleted' });
		} catch (err) {
			res.status(500).json(err);
		}
	});

// router.post('/', async (req, res) => {
// 	// create a new category
// 	try {
// 		const newCategory = await Category.create(req.body);
// 		res.status(200).json(newCategory);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// router.put('/:id', async (req, res) => {
// 	// update a category by its `id` value
// 	try {
// 		const updateCategory = await Category.update(req.body, {
// 			where: {
// 				id: req.params.id,
// 			},
// 		});
// 		if (!updateCategory[0]) {
// 			res.status(404).json({ message: 'No category with this id' });
// 		}
// 		res.status(200).json({
// 			message: `Category updated.`,
// 		});
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// router.delete('/:id', async (req, res) => {
// 	// delete a category by its `id` value
// 	try {
// 		const deleteCategory = await Category.destroy({
// 			where: {
// 				id: req.params.id,
// 			},
// 		});
// 		if (!deleteCategory) {
// 			res.status(404).json({ message: 'No category with this id' });
// 			return;
// 		}
// 		res.status(200).json({ message: 'Category Deleted' });
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = router;
