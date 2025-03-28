//routes/promotionRoute.js

const express = require('express');
const router = express.Router();
const promoController = require('../controllers/promoController.js');
const { requireAuth } = require('../middleware/authMiddleware.js');

// Promotion List Page (Promotion Page)
router.get('/promotions/hero-list',requireAuth, promoController.renderHeroList);
router.get('/promotions/hero-create',requireAuth, promoController.renderHeroPost);
router.get('/promotions/hero-edit/:id',requireAuth, promoController.renderHeroEdit);
router.get('/promotions/hero-delete/:id',requireAuth, promoController.deleteHero);

router.get('/promotions/promo-list',requireAuth, promoController.renderPromoList);
router.get('/promotions/promo-create',requireAuth, promoController.renderPromoPost);
router.get('/promotions/promo-edit/:id',requireAuth, promoController.renderPromoEdit);
router.get('/promotions/promo-delete/:id',requireAuth, promoController.deletePromo);


module.exports = router;
