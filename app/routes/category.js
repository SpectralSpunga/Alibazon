const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/category/mens', categoryController.categoryMens);
router.get('/category/mens/clothing', categoryController.clothingMens);
router.get('/category/mens/accessories', categoryController.accessoriesMens);

router.get('/category/womens', categoryController.categoryWomens);
router.get('/category/womens/clothing', categoryController.clothingWomens);
router.get('/category/womens/accessories', categoryController.accessoriesWomens);
router.get('/category/womens/jewelry', categoryController.jewelryWomens);

module.exports = router;