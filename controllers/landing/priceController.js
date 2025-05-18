//controllers/landing/aboutController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://3cleaningsydney.com:3000/api'; // Replace with your backend URL

exports.renderPageHouseCleaning = async (req, res) => {
    try {
        const respPackage = await axios.get(`${BACKEND_API}/packages/detail/all?packageId=67d151d97d3a37c73d49d493`)
        const packages = respPackage.data;
        
        const respAddon = await axios.get(`${BACKEND_API}/addOns`);
        const addOns = respAddon.data;
        res.render('landing/contents/price-house-cleaning', {packages,addOns});
    } catch (err) {
        console.error(err.message);
        res.render('contents/error-500'); // Render a custom 404 page
        
    }
};