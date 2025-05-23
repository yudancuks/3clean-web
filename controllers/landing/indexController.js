//controllers/landing/indexController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'https://3cleaningsydney.com/api'; // Replace with your backend URL

exports.renderHome = async (req, res) => {
    try {
        
        res.render('landing/contents/home');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};