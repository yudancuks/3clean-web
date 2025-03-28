//routes/orderRoute.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Order List Page (Protected Page)
router.get('/list',requireAuth, orderController.renderList);
router.get('/create',requireAuth, orderController.renderPost);
router.get('/edit/:id',requireAuth, orderController.renderPut);
router.get('/delete/:id',requireAuth, orderController.renderDelete);

module.exports = router;