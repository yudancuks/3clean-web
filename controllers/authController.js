//controllers/authControllers.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com/api'; // Replace with your backend URL


exports.renderLogin = (req, res) => {
    res.render('contents/auth/login');
};
