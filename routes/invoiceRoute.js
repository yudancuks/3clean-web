//routes/orderRoute.js

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Order List Page (Protected Page)
router.get('/list',requireAuth, invoiceController.renderList);
router.get('/generate/:id',requireAuth, invoiceController.renderInvoice);

module.exports = router;