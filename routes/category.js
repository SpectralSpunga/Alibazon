const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const subCategoryController = require('../controllers/subCategoryController');

router.get('/category/mens', categoryController.categoryMens);
router.get('/category/mens/clothing', subCategoryController.clothingMens);
router.get('/category/mens/accessories', subCategoryController.accessoriesMens);

router.get('/category/womens', categoryController.categoryWomens);
router.get('/category/womens/clothing', subCategoryController.clothingWomens);
router.get('/category/womens/accessories', subCategoryController.accessoriesWomens);
router.get('/category/womens/jewelry', subCategoryController.jewelryWomens);

module.exports = router;