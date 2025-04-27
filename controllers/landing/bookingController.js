//controllers/landing/bookingController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com:3000/api'; // Replace with your backend URL

exports.renderPage = async (req, res) => {
    try {
        const respAddon = await axios.get(`${BACKEND_API}/addOns`);
        const addOns = respAddon.data;

        res.render('landing/contents/booking', {addOns});
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};