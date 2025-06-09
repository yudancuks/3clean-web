//controllers/landing/userController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000/api'; // Replace with your backend URL

exports.renderLogin = async (req, res) => {
    try {
        res.render('landing/contents/userarea/signin');
    } catch (err) {
        console.error(err.message);
        res.status(404).render('contents/error-404'); // Render a custom 404 page
    }
};

exports.renderRegister = async (req, res) => {
    try {
        res.render('landing/contents/userarea/register');

    } catch (err) {
        console.error(err.message);
        res.render('contents/error-400');
    }
};

exports.renderOrder = async (req, res) => {
    try {    
        // Extract JWT token (assuming it's in req.user.token or req.cookies.token, adjust as needed)
        const token = req.user?.token || req.cookies.token;
        if (!token) {
            throw new Error('JWT token not found');
        }

        // Call the API with JWT
        const apiResponse = await axios.get('http://localhost:3000/api/my-orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const orders = apiResponse.data
        console.log(orders);
        res.render('landing/contents/userarea/order',{user: req.user, orders});
    } catch (err) {
        console.error(err.message);
        res.render('contents/error-400');
    }
};

exports.renderOrderDetail = async (req, res) => {
    try {
        

    } catch (err) {
        console.error(err.message);
        res.render('contents/error-400');
    }
};
