//controllers/landing/serviceController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000/api'; // Replace with your backend URL

exports.renderPage = async (req, res) => {
    try {
        
        res.render('landing/contents/service',{user: req.user});
    } catch (err) {
        console.error(err.message);
        res.render('contents/error-500');
    }
};