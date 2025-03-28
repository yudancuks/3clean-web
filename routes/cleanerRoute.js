//routes/adminRoute.js

const express = require('express');
const router = express.Router();
const cleanerController = require('../controllers/cleanerController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Product List Page (Protected Page)
router.get('/peoples/cleaner-list',requireAuth, cleanerController.renderUserList);
router.get('/peoples/cleaner-create',requireAuth, cleanerController.renderUserCreate);
router.get('/peoples/cleaner-edit/:id',requireAuth, cleanerController.renderUserEdit);
router.get('/peoples/cleaner-delete/:id',requireAuth, cleanerController.deleteUser);

module.exports = router;
