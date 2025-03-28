//routes/dashboardRoute.js

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Dashboard Page (Protected Page)
router.get('/dashboard',requireAuth, dashboardController.renderDashboard);

module.exports = router;
