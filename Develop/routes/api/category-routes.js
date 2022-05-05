const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
// {
// 	"category_name": "Boots"
// }
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json([categoryData, { message: `Product successfully created` }]);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
// {
// 	"category_name": "Bootseys"
// }
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id or no change was made!' });
      return;
    }
    res.status(200).json([categoryData, { message: `Category successfully updated` }]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (categoryData === 0) {
      res.status(404).json({ message: `id ${req.params.id} does not exist` });
      return
    }
    res.status(200).json({ message: `id ${req.params.id} successfully deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;