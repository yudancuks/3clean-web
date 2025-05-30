//controllers/dashboardController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000'; // Replace with your backend URL

exports.renderDashboard = async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_API}/datadashboard`);
        const data = response.data;
         res.render('contents/dashboard', {data});
        //res.render('contents/dashboard');
    } catch (err) {
        console.error(err.message);
        res.redirect('/dashboard/login');
    }
};
