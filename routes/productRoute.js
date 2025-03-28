//routes/productRoute.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Product List Page (Protected Page)
router.get('/products/product-list', requireAuth, productController.renderProductList);
router.get('/products/product-create', requireAuth, productController.renderProductPost);
router.get('/products/product-edit/:slug', requireAuth, productController.renderProductEdit);
router.get('/products/product-delete/:id', requireAuth, productController.deleteProduct);


router.get('/products/discount-list', requireAuth, productController.renderDiscountList);
router.get('/products/discount-create', requireAuth, productController.renderDiscountPost);
router.get('/products/discount-edit/:id', requireAuth, productController.renderDiscountEdit);
router.get('/products/discount-delete/:id', requireAuth, productController.deleteDiscount);

module.exports = router;
