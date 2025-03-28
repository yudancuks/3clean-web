//routes/serviceRoute.js

const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Product List Page (Protected Page)
router.get('/list',requireAuth, packageController.renderList);
router.get('/create',requireAuth, packageController.renderPost);
router.get('/edit/:id',requireAuth, packageController.renderPut);
router.get('/delete/:id',requireAuth, packageController.renderDelete);

module.exports = router;