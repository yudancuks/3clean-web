//routes/serviceRoute.js

const express = require('express');
const router = express.Router();
const indexController = require('../../controllers/landing/indexController.js');
const serviceController = require('../../controllers/landing/serviceController.js');
const aboutController = require('../../controllers/landing/aboutController.js');
const reviewController = require('../../controllers/landing/reviewController.js');
const priceController = require('../../controllers/landing/priceController.js');
const bookingController = require('../../controllers/landing/bookingController.js');

const attachUser = require('../../middleware/attachUser');

router.use(attachUser);

// Home Page (Public Page)
router.get('/', indexController.renderHome);
//Service Page
router.get('/services', serviceController.renderPage);
//About Page
router.get('/about-us', aboutController.renderPage);
//Review Page
router.get('/reviews', reviewController.renderPage);
//Price Page House Cleaning
router.get('/prices/house-cleaning', priceController.renderPageHouseCleaning);
//Price Page Booking 
router.get('/book-now', bookingController.renderPage);

router.get('/payment-upload', bookingController.renderPage);
module.exports = router;