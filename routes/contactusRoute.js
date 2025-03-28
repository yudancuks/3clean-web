//routes/contactusRoute.js

const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactusController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Product List Page (Protected Page)
router.get('/contact-us/message-list', requireAuth, contactusController.renderMessageList);


module.exports = router;
