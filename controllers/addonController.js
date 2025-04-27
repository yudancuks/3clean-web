//controllers/addonController.js

const axios = require('axios');
const BACKEND_API = process.env.BACKEND_API || 'https://3cleaningsydney.com:3000/api'; // Replace with your backend URL

exports.renderList = async (req, res) => {
    try {
        const response = await axios.get(`${BACKEND_API}/addOns`);
        const list = response.data;
        res.render('contents/addons/list', { list });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderPost = async (req, res) => {
    try {
        res.render('contents/addons/create');
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderPut = async (req, res) => {
    try {
        const { id } = req.params; // Extract id from request parameters
       
        // Fetch discount data from the API
       const response = await axios.get(`${BACKEND_API}/addOns/${id}`);
        
       // Extract discount data
       const data = response.data;
       // Render the view and pass the discount data
       
       res.render('contents/addons/create', { data });
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
};

exports.renderDelete = async (req, res) => {
    try {
        const { id } = req.params; // Extract product ID from request parameters

        // Send delete request to the backend
        await axios.delete(`${BACKEND_API}/addOns/${id}`);

        // Redirect to the product list or send a success response
        res.redirect('/dashboard/addons/list');
    } catch (err) {
        console.error(err.message);

        // Handle errors gracefully
        res.status(500).send({
            error: 'Failed to delete the product. Please try again later.',
            details: err.message
        });
    }
};
