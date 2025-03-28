//routes/serviceRoute.js

const express = require('express');
const router = express.Router();
const addonController = require('../controllers/addonController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Product List Page (Protected Page)
router.get('/list',requireAuth, addonController.renderList);
router.get('/create',requireAuth, addonController.renderPost);
router.get('/edit/:id',requireAuth, addonController.renderPut);
router.get('/delete/:id',requireAuth, addonController.renderDelete);

module.exports = router;