//controllers/landing/aboutController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'http://localhost:3000/api'; // Replace with your backend URL

exports.renderPageHouseCleaning = async (req, res) => {
    try {
        const respPackage = await axios.get(`${BACKEND_API}/packages/detail/all?packageId=6838a8dac9581466f6f62987`)
        const packages = respPackage.data;
        
        const respAddon = await axios.get(`${BACKEND_API}/addOns`);
        const addOns = respAddon.data;
        res.render('landing/contents/price-house-cleaning', {packages,addOns});
    } catch (err) {
        console.error(err.message);
        res.render('contents/error-500'); // Render a custom 404 page
        
    }
};