const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.get('/category/:category', categoryController.category)
router.get('/category/:category/:subCategory', categoryController.subCategory)

module.exports = router;