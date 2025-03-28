//routes/vsightRoute.js

const express = require('express');
const router = express.Router();
const vsightController = require('../controllers/vsightController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Product List Page (Protected Page)
router.get('/blogs/post-list',requireAuth, vsightController.renderPostList);
router.get('/blogs/post-create',requireAuth, vsightController.renderPostCreate);
router.get('/blogs/post-edit/:id',requireAuth, vsightController.renderBlogEdit);
router.get('/blogs/post-delete/:id',requireAuth, vsightController.deleteBlog);

module.exports = router;
