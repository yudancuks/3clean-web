//controllers/authControllers.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'https://3cleaningsydney.com:3000/api'; // Replace with your backend URL


exports.renderLogin = (req, res) => {
    res.render('contents/auth/login');
};
