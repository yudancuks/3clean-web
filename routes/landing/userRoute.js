//routes/userRoute.js

const express = require('express');
const router = express.Router();
const { signOut } = require('../../middleware/userMiddleware.js');
const userController = require('../../controllers/landing/userController.js');



// User Login Page : Public
router.get('/user/login', userController.renderLogin);

// User Registe Page : Public
router.get('/user/register', userController.renderRegister);

// User Signout Page : Private
router.get('/user/signout', signOut, (req, res) => {
  res.redirect('/customer/login');
});

// User History Order : Prirvate
router.get('/user/orders', userController.renderOrder);

// User Detail Order : Prirvate
router.get('/user/order/:id', userController.renderOrderDetail);


module.exports = router;