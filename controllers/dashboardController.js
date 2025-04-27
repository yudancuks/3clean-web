//controllers/dashboardController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com:3000'; // Replace with your backend URL

exports.renderDashboard = async (req, res) => {
    try {


         res.render('contents/dashboard');
        //res.render('contents/dashboard');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};
