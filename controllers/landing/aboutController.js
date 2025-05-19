//controllers/landing/aboutController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com/api'; // Replace with your backend URL

exports.renderPage = async (req, res) => {
    try {
        
        res.render('landing/contents/aboutus');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};