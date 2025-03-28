//routes/authRoute.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const { signOut } = require('../middleware/authMiddleware.js');

// Login Page
router.get('/dashboard/login', authController.renderLogin);
router.get('/dashboard/logout', signOut,authController.renderLogin);


module.exports = router;
