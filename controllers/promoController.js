//controllers/productController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000/api'; // Replace with your backend URL

exports.renderHeroList = async (req, res) => {
    try {

        const response = await axios.get(`${BACKEND_API}/promotions/hero-banner`);
        const heroes = response.data.promotions;

        res.render('contents/promotions/hero-list', { heroes });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderHeroPost = async (req, res) => {
    try {
        res.render('contents/promotions/hero-post');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};


exports.renderHeroEdit = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
       
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/promotions/hero-banner/${id}`);
        
       // Extract discount data
       const promotion = response.data.promotion;
       // Render the view and pass the discount data
       res.render('contents/promotions/hero-post', { promotion });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};


exports.deleteHero = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/promotions/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/promotions/hero-list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the product. Please try again later.',
            details: err.message
        });
    }
};


exports.renderPromoList = async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_API}/promotions/promo-banner`);
        const promos = response.data.promotions;

        res.render('contents/promotions/promo-list', {promos});
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderPromoPost = async (req, res) => {
    try {
        res.render('contents/promotions/promo-post');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.deletePromo = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/promotions/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/promotions/promo-list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the product. Please try again later.',
            details: err.message
        });
    }
};

exports.renderPromoEdit = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
       
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/promotions/hero-banner/${id}`);
        
       // Extract discount data
       const promotion = response.data.promotion;
       // Render the view and pass the discount data
       res.render('contents/promotions/promo-post', { promotion });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};
