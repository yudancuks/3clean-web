//routes/serviceRoute.js

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Service List Page (Protected Page)
router.get('/list',requireAuth, serviceController.renderList);
router.get('/create',requireAuth, serviceController.renderPost);
router.get('/edit/:id',requireAuth, serviceController.renderPut);
router.get('/delete/:id',requireAuth, serviceController.renderDelete);

module.exports = router;